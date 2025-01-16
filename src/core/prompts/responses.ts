import { Anthropic } from "@anthropic-ai/sdk"
import * as path from "path"
import * as diff from "diff"

// 导出格式化响应对象，包含多个用于处理不同场景的工具函数
export const formatResponse = {
	// 用户拒绝操作时的基础响应
	toolDenied: () => `The user denied this operation.`,

	// 用户拒绝操作并提供反馈时的响应
	toolDeniedWithFeedback: (feedback?: string) =>
		`The user denied this operation and provided the following feedback:\n<feedback>\n${feedback}\n</feedback>`,

	// 工具执行失败时的错误响应
	toolError: (error?: string) => `The tool execution failed with the following error:\n<error>\n${error}\n</error>`,

	noToolsUsed: () =>
		`[ERROR] You did not use a tool in your previous response! Please retry with a tool use.

${toolUseInstructionsReminder}

# Next Steps

If you have completed the user's task, use the attempt_completion tool. 
If you require additional information from the user, use the ask_followup_question tool. 
Otherwise, if you have not completed the task and do not need additional information, then proceed with the next step of the task. 
(This is an automated message, so do not respond to it conversationally.)`,

	tooManyMistakes: (feedback?: string) =>
		`You seem to be having trouble proceeding. The user has provided the following feedback to help guide you:\n<feedback>\n${feedback}\n</feedback>`,

	missingToolParameterError: (paramName: string) =>
		`Missing value for required parameter '${paramName}'. Please retry with complete response.\n\n${toolUseInstructionsReminder}`,

	invalidMcpToolArgumentError: (serverName: string, toolName: string) =>
		`Invalid JSON argument used with ${serverName} for ${toolName}. Please retry with a properly formatted JSON argument.`,

	// 处理工具执行结果，支持文本和图片混合输出
	toolResult: (
		text: string,
		images?: string[],
	): string | Array<Anthropic.TextBlockParam | Anthropic.ImageBlockParam> => {
		if (images && images.length > 0) {
			const textBlock: Anthropic.TextBlockParam = { type: "text", text }
			const imageBlocks: Anthropic.ImageBlockParam[] = formatImagesIntoBlocks(images)
			// 将图片放在文本后面可以获得更好的效果
			return [textBlock, ...imageBlocks]
		} else {
			return text
		}
	},

	imageBlocks: (images?: string[]): Anthropic.ImageBlockParam[] => {
		return formatImagesIntoBlocks(images)
	},

	// 格式化文件列表，将绝对路径转换为相对路径并进行排序
	formatFilesList: (absolutePath: string, files: string[], didHitLimit: boolean): string => {
		const sorted = files
			.map((file) => {
				// 将绝对路径转换为相对路径
				const relativePath = path.relative(absolutePath, file).toPosix()
				return file.endsWith("/") ? relativePath + "/" : relativePath
			})
			// 对文件进行排序，确保目录下的文件正确显示
			// 即使文件列表被截断，也能清楚地显示目录结构
			.sort((a, b) => {
				const aParts = a.split("/") // 需要先使用 toPosix
				const bParts = b.split("/")
				for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
					if (aParts[i] !== bParts[i]) {
						// 如果在当前层级一个是目录另一个不是，则目录优先
						if (i + 1 === aParts.length && i + 1 < bParts.length) {
							return -1
						}
						if (i + 1 === bParts.length && i + 1 < aParts.length) {
							return 1
						}
						// 否则按字母顺序排序
						return aParts[i].localeCompare(bParts[i], undefined, { numeric: true, sensitivity: "base" })
					}
				}
				// 如果较短路径的所有部分都相同，则较短的路径优先
				return aParts.length - bParts.length
			})
		if (didHitLimit) {
			return `${sorted.join(
				"\n",
			)}\n\n(File list truncated. Use list_files on specific subdirectories if you need to explore further.)`
		} else if (sorted.length === 0 || (sorted.length === 1 && sorted[0] === "")) {
			return "No files found."
		} else {
			return sorted.join("\n")
		}
	},

	// 创建文件差异的补丁
	createPrettyPatch: (filename = "file", oldStr?: string, newStr?: string) => {
		// 字符串不能为 undefined，否则 diff 会抛出异常
		const patch = diff.createPatch(filename.toPosix(), oldStr || "", newStr || "")
		const lines = patch.split("\n")
		const prettyPatchLines = lines.slice(4)
		return prettyPatchLines.join("\n")
	},
}

// 将图片数据 URL 转换为 Anthropic 图片块格式
// 避免循环依赖，所以在文件末尾定义
const formatImagesIntoBlocks = (images?: string[]): Anthropic.ImageBlockParam[] => {
	return images
		? images.map((dataUrl) => {
				// 解析 data URL 格式：data:image/png;base64,base64string
				const [rest, base64] = dataUrl.split(",")
				const mimeType = rest.split(":")[1].split(";")[0]
				return {
					type: "image",
					source: { type: "base64", media_type: mimeType, data: base64 },
				} as Anthropic.ImageBlockParam
			})
		: []
}

// 工具使用说明文本，提供 XML 格式的工具调用示例
const toolUseInstructionsReminder = `# Reminder: Instructions for Tool Use

Tool uses are formatted using XML-style tags. The tool name is enclosed in opening and closing tags, and each parameter is similarly enclosed within its own set of tags. Here's the structure:

<tool_name>
<parameter1_name>value1</parameter1_name>
<parameter2_name>value2</parameter2_name>
...
</tool_name>

For example:

<attempt_completion>
<result>
I have completed the task...
</result>
</attempt_completion>

Always adhere to this format for all tool uses to ensure proper parsing and execution.`
