# OpenH3-IR ComfyUI 节点

[English](README.md) | [简体中文](README.zh-CN.md)

**写下镜头，放入参考素材，然后渲染。**

这是在 ComfyUI 中使用 [OpenH3-IR](https://github.com/ruashots/open-h3-ir) 的原生方式。OpenH3-IR 是 MiniMax H3 Context-IR 层的开放本地实现。

![四个 OpenH3-IR 节点在深色画布上连接](https://raw.githubusercontent.com/ruashots/ComfyUI-OpenH3-IR/main/docs/media/openh3ir-comfyui-title.webp)

你可以自然地描述视频，用 `@` 按名称引用素材，并用 `@speaks()` 锁定必须原样保留的台词。

**不用再记录 `<Picture 1>` 对应什么，不用来回复制提示词，也不需要额外启动第二个服务。**

```text
@the-man 穿过 @desert，@dragon 跟在他身旁。
他回头看了一眼，然后 @speaks("你真的一路追到这里来了？")
```

将鼠标悬停在 `@the-man` 上即可看到它指向的文件。替换该文件后，提示词仍然指向同一个角色。

## 在 ComfyUI 中使用 OpenH3-IR

OpenH3-IR 位于普通请求与 MiniMax H3 实际读取的结构化文档之间。本仓库提供四个节点和一份可直接运行的工作流。

安装节点包时，`open-h3-ir` 也会安装进 ComfyUI 自己的 Python 环境。通常的执行路径完全在 ComfyUI 进程内：

**ComfyUI → OpenH3-IR → MiniMax H3 → 渲染**

不需要启动额外程序、选择端口或维护第二套环境。需要时，同一工作流也可以连接另一台机器上的 OpenH3-IR HTTP 服务。

## 四个节点

| 节点 | 用途 |
| --- | --- |
| **OpenH3-IR Main** | 提示词、时长、画幅、镜头数和编写控制 |
| **OpenH3-IR Media** | 统一管理图片、视频和音频的素材托盘 |
| **OpenH3-IR Setup** | 语言模型、MiniMax H3 文件和 OpenH3-IR 运行位置 |
| **OpenH3-IR Director** | 可选且可复用的摄影、灯光、节奏、表演、声音和音乐指导 |

这些节点会：

- 把普通文字转成 H3 所需的 Context-IR 简报
- 将 `@hero`、`@city`、`@music` 等名称直接绑定到文件
- 理解每份参考素材的用途
- 用 `@speaks("...")` 锁定精确台词
- 同步时长、H3 合法帧数和 latent
- 根据实际参考素材选择 H3 任务类型
- 加载你明确选择的 H3 文件
- 将 model、conditioning、latent 和 VAE 交回 ComfyUI
- 报告实际编写、加载、解析和使用的内容

采样器、LoRA、步数、sigma shift、解码和保存仍由你控制。OpenH3-IR 准备 H3 任务，ComfyUI 负责渲染。

## 安装

### ComfyUI Manager

在 ComfyUI Manager 中搜索 **OpenH3-IR**，安装后重启 ComfyUI。这是推荐方式。

### 手动安装

```bash
git clone https://github.com/ruashots/ComfyUI-OpenH3-IR.git /path/to/ComfyUI/custom_nodes/ComfyUI-OpenH3-IR
/path/to/ComfyUI/python -m pip install -r /path/to/ComfyUI/custom_nodes/ComfyUI-OpenH3-IR/requirements.txt
```

第二条命令会把 `open-h3-ir` 安装到 ComfyUI 使用的同一个 Python 环境中。

## 快速开始

打开：

```text
example/openh3ir_base_workflow.json
```

然后：

1. 在 **OpenH3-IR Setup** 中填写 OpenAI 兼容接口地址
2. 点击 **test**
3. 选择五个 MiniMax H3 模型文件
4. 编写提示词
5. 加入队列

这些步骤足以完成纯文字生视频。需要图片、视频或声音时，再加入 **OpenH3-IR Media**。

语言模型可以使用 vLLM、llama.cpp server、LM Studio、Ollama 或托管的 OpenAI 兼容接口。任务包含视觉参考时，语言模型必须具有视觉能力；Setup 会发送测试图片实际检测。

## 界面语言

英文仍是默认语言，同时提供简体中文界面。打开 **Settings → OpenH3-IR → Language**，选择 **Auto**、**English** 或 **简体中文**，然后刷新 ComfyUI。

Auto 优先跟随 ComfyUI 的语言，再回退到浏览器语言。翻译只改变标签、控件、帮助文字和状态消息；节点 ID、字段名、保存值、API 数据和工作流保持不变。

---

# Main

Main 保存提示词以及属于本条视频的设置。

## 提示词

使用自然语言描述。引用 Media 托盘中的内容时使用 `@`：

```text
@hero 走上 @gantry，看到下方的 @city 后停了下来。
```

必须原样保留的台词使用 `@speaks()`：

```text
@hero 转过身，@speaks("把你身后的门关上。")
```

提示词下方会显示已引用素材、已锁定台词和无法解析的内容。

## 视频设置

| 控件 | 含义 |
| --- | --- |
| **seconds** | 唯一的时长设置，同时用于简报和渲染 |
| **frame shape** | 16:9、21:9、4:3、1:1、3:4 或 9:16 |
| **resolution** | H3 原生短边 768，或指定像素面积 |
| **shots** | `auto` 自动决定剪辑，也可固定为 1 到 10 个镜头 |

无法在所选时长中容纳的镜头数会被明确拒绝，而不是静默修改。

## 编写设置

| 控件 | 含义 |
| --- | --- |
| **invention** | 未明确规定处允许补充多少内容：restrained、balanced、bold 或 extreme |
| **music** | 由编写模型决定音乐，或明确不要音乐 |
| **spoken in** | `@speaks()` 台词使用的语言 |

关闭音乐不会关闭环境声和动作声，因为 H3 会在同一次生成中处理画面和声音。

## 高级设置

- `brief seed` 改变提示词编写结果，不是采样器种子
- `reference size` 的 `match` 根据渲染尺寸调整，`max` 保留更多原图尺寸，身份一致性可能更强，但更慢
- `writing effort` 控制语言模型编写简报时投入的推理量

---

# Media

Media 是 H3 查看和聆听的统一素材托盘。可把文件拖到面板，或点击空槽选择文件。图片、视频和声音会自动分类。

## 用名称代替 `<Picture 1>`

将 `picture1`、`video1`、`audio1` 改成有意义的名称，例如：

```text
hero
dragon
desert
reference-camera
music
```

然后在提示词中直接引用：

```text
@hero 穿过 @desert，@dragon 跟在他身旁。
```

输入 `@` 时会打开带缩略图的参考素材列表。不存在的名称会变红，并在调用模型前被拒绝。悬停引用可查看图片、视频帧或音频说明。

## 替换文件而不修改提示词

把新文件拖到已有槽位时，名称、用途和说明都会保留。因此提示词中的 `@hero` 无需修改。

如果新视频没有音轨，旧的音轨选择会关闭；替换音频时，属于旧录音的文字会被清除。节点会明确提示这些变化。

## 素材用途

这些用途会改变 OpenH3-IR 构建任务的方式，并非普通提示词备注。

### 图片

- **something in the shot**：画面中的人物或物体
- **the setting**：场景环境
- **a style to copy**：参考风格
- **add it to an existing clip**：加入已有视频
- **replace the one in an existing clip**：替换已有视频中的对象
- **first frame**：首帧
- **last frame**：尾帧
- **storyboard**：故事板

### 视频

- **copy what is in it**：参考视频内容
- **copy how it is shot**：只参考拍摄结构和运镜
- **edit it**：编辑源视频
- **carry on from it**：从源视频继续生成

### 声音

- **play it**：直接使用
- **match its style**：匹配风格
- **cut to its beat**：按节拍剪辑
- **sound effect**：音效
- **voice to match**：匹配音色

图片设为 `first frame` 或 `last frame` 会切换到 H3 的 FL2VA 路径。无效组合会在语言模型或渲染器运行前被拒绝。

## 人物和物体替换

把视频设为 `edit it`，再把图片设为 `replace the one in an existing clip`。图片中的对象会替换视频中的已有对象，并尽量跟随原位置、动作和时间。

存在多个目标时，请描述原对象，例如 `the man in the plaid shirt`。这仍然是 H3 重新生成新视频，不是逐帧原地修补。

## 精确台词

普通引号中的文字可以被编写模型润色。必须完全保留的台词写成：

```text
@speaks("今晚大门不会打开。")
```

返回的简报会经过验证，确保台词逐字逐标点保留。台词语言在 Main 的 `spoken in` 中选择。

---

# Setup

Setup 保存运行环境设置。

## 语言模型

填写以 `/v1` 结尾的完整接口地址：

```text
http://192.168.1.20:8000/v1
```

点击 **test** 后，节点会连接接口、读取模型列表、在只有一个模型时自动填写，并发送图片检测视觉能力。

接口必须能从运行 ComfyUI 的机器访问，而不仅仅是浏览器能访问。如果提供多个模型，需要由你选择。

### API 密钥

API 密钥不会保存进工作流，而是放在 ComfyUI 用户目录中，因为工作流可能被分享或嵌入生成文件。

### 环境变量

如果启动 ComfyUI 前设置了：

```text
H3IR_LLM_URL
H3IR_LLM_MODEL
```

节点中的空字段可以继承这些值，报告会说明来源。

## 五个 MiniMax H3 文件

选择器只显示当前 ComfyUI 实际拥有的文件，没有隐藏的 `auto`，也不会根据文件名猜测。报告会列出实际加载的文件和加载器。

---

# Director

Director 是可选节点。连接后，它会为提示词未明确规定的构图、运镜、灯光、色彩、节奏、表演、声音和音乐提供指导。

## 描述习惯，而不只是导演姓名

真正发送给编写模型的是完整指导文字，而不是导演名称。节点内置七个可编辑示例，你可以修改、重命名、删除或保存自己的配置。

Director 只影响留白的部分，不会覆盖明确要求。比如明确要求固定机位全景，镜头仍会保持固定。

MiniMax H3 能识别 20 种有固定名称的运镜。Director 会显示这套词表，使用 H3 真正认识的术语通常能得到更强的遵循度。

保存并非生效所必需，只是为了复用。保存位置：

```text
user/default/openh3ir/directors/
```

工作流会携带完整指导文字，因此发送给其他人时不要求对方拥有相同的资料库。

---

# 时长与输出

MiniMax H3 按固定的 `17k+5` 帧网格渲染。OpenH3-IR 只提供一个 seconds 控件，将结果同时用于 Context-IR、镜头时序、帧数、latent 和渲染。

请求 10 秒时，合法结果可能是 10.125 秒，报告会显示请求值和实际值。

Main 输出：

| 输出 | 连接到 |
| --- | --- |
| `model` | 模型补丁、guider 和 scheduler |
| `positive` | guider conditioning |
| `latent` | sampler |
| `vae` | VAE Decode |
| `audio_vae` | VAE Decode Audio |

`prompt` 是编译后的 Context-IR 简报；`report` 包含任务类型、实际时长、模型文件、参考绑定和警告。可将 `report` 接到 ComfyUI 的 **Preview as Text**。

# 渲染仍由 ComfyUI 完成

本节点包不负责采样或保存，只准备 H3 任务。LoRA、模型补丁、采样器、步数、sigma shift、scheduler、解码和保存仍可正常调整。

# GGUF

安装 ComfyUI-GGUF 后，`.safetensors` 和 `.gguf` 会出现在同一选择器中。选择 `.safetensors` 使用原生加载器，选择 `.gguf` 使用 ComfyUI-GGUF，因此不需要独立开关。

checkpoint 和编码器可以独立选择并混用支持的格式。GGUF 路由、文件列表和加载器选择已通过单元测试，但作者开发机器尚未完整执行 H3 GGUF 端到端渲染。

# 素材限制

- 最多 9 张图片
- 最多 3 段视频
- 最多 3 个独立声音
- 托盘总计最多 12 个文件

不符合限制的文件会在拖放时被明确拒绝，不会静默丢弃或上传。

Media 状态会随工作流保存，包括槽位、名称、角色、说明、视频音轨选择和替换目标。素材文件本身仍位于 ComfyUI input 目录。

Media 目前不接收其他节点直接传来的 `IMAGE`、`VIDEO` 或 `AUDIO` 值。请先保存为文件再加入托盘，以保证分析和渲染使用同一份输入。

# 在其他机器运行 OpenH3-IR

Setup 中的 `runs at` 留空时，OpenH3-IR 在当前 ComfyUI 中运行。填写远程服务地址后，同一工作流会使用该实例：

```text
h3ir serve
```

ComfyUI 仍在本地渲染。远程实例使用自己的语言模型配置，因此 Setup 中的语言模型字段不再生效。

节点优先发送可直接访问的文件路径；如果两台机器的路径写法不同，会尝试合理变体；如果都无法打开，则自动上传。上传按内容寻址，未变化的媒体不需要重复传输。

# 独立更新与缓存

ComfyUI 节点包和 OpenH3-IR 分别发布。Main 会在排队前询问编译器支持的能力，不兼容时会在媒体传输前停止并指出需要更新哪一侧。

节点会根据输入缓存编译结果。未修改的工作流再次排队时可以复用同一份简报；想得到另一种编写解释时修改 `brief seed`。

# 出错时

先查看弹出提示或 `report`：

| 问题 | 检查位置 |
| --- | --- |
| 没有语言模型地址 | Setup 地址字段 |
| OpenH3-IR 缺失或无法导入 | ComfyUI Python 安装 |
| 接口提供多个模型 | 模型选择字段 |
| 语言模型或远程实例离线 | 对应接口地址和端口 |
| 找不到或无法分析附件 | 报告中列出的路径和媒体错误 |
| 缺少 ffmpeg | OpenH3-IR 实际运行的机器 |
| 参考素材过多 | H3 的数量上限 |
| 素材角色冲突 | 报告中指出的槽位和原因 |

# 已知限制

OpenH3-IR 不能自动听懂音频内容，只知道文件属性和你填写的说明。需要时可为 `voice to match` 或 `play it` 填写录音中的文字。

视频编辑和对象替换会生成新视频，不会修改原文件，也不是逐帧原地编辑。

Media 托盘目前只接收磁盘文件，不接收其他节点直接输出的媒体值。

# 其他使用方式

主项目位于 [ruashots/open-h3-ir](https://github.com/ruashots/open-h3-ir)。同一套 Context-IR 实现也可以通过命令行、HTTP API 或 Python 软件包使用。

如果只想在 ComfyUI 中使用，无需手动运行两个仓库；安装本节点包即可。

# 致谢

前端实现中的部分技术来自两个采用 MIT 许可证的项目：

- ComfyUI-Fantastic-MiniMaxH3-PromptBuilder，作者 Adudeguyman
- ComfyUI-MiniMaxH3-Easy，作者 nkxx188

完整署名见 `NOTICE`。

# 许可证

本节点包采用 Apache 2.0，详见 `LICENSE`。MiniMax H3 模型有自己的许可证和条款，需单独遵守。
