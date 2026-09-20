/* Lightweight UI localization. Stored widget values and API payloads stay in English. */
import { app } from "../../scripts/app.js";

const SETTING = "OpenH3IR.Locale";

const ZH = new Map(Object.entries({
  "OpenH3-IR Main": "OpenH3-IR 主控",
  "OpenH3-IR Setup": "OpenH3-IR 设置",
  "OpenH3-IR Director": "OpenH3-IR 导演",
  "OpenH3-IR Media": "OpenH3-IR 素材",
  "setup": "设置",
  "media": "素材",
  "report": "报告",
  "model": "模型",
  "positive": "正向条件",
  "latent": "潜空间",
  "vae": "VAE",
  "audio_vae": "音频 VAE",
  "prompt": "提示词",
  "Main": "主控",
  "one prompt to a ready H3 job": "一段描述，生成完整 H3 任务",
  "your prompt": "你的提示词",
  "one plain sentence, what happens, with @ for anything in the tray\n@picture1 walks onto the wet gantry in the rain and stops when he sees the city below": "用一句话描述发生了什么，用 @ 引用素材托盘中的内容\n@picture1 走上雨中的湿滑栈桥，看到下方的城市后停住脚步",
  "Say what happens. Type @ to name anything in the tray, or to lock a spoken line.": "描述画面中发生的事情。输入 @ 可引用素材，或锁定一句台词。",
  "the video": "视频",
  "How long it runs, what shape and size it is, and how many shots.": "设置时长、画幅、尺寸和镜头数量。",
  "the writing": "提示词编写",
  "What the writer decides where your prompt leaves things open.": "设置提示词未明确之处由编写模型如何补充。",
  "spoken in": "台词语言",
  "seconds": "时长（秒）",
  "frame shape": "画幅",
  "resolution": "分辨率",
  "shots": "镜头数",
  "invention": "创作幅度",
  "music": "音乐",
  "brief seed": "编写种子",
  "reference size": "参考图尺寸",
  "writing effort": "编写强度",
  "or type": "或输入",
  "nothing written yet": "尚未填写内容",
  "nothing in that drop was a file.": "拖放内容中没有文件。",
  "a slot needs a name: it is what an @ in the prompt reaches this file by.": "素材槽需要一个名称，提示词通过 @ 加这个名称来引用文件。",
  "a name needs a letter or a digit in it, so dashes on their own cannot name a slot.": "名称必须包含英文字母或数字，不能只使用连字符。",
  "One spoken line was never closed. Close it with a quote mark and a bracket.": "有一句台词没有闭合，请用引号和右括号结束它。",
  "No Media node is connected, so the video is written from your words alone.": "未连接素材节点，将只根据文字生成视频。",
  "The tray is empty. Add files on the Media node.": "素材托盘为空，请在素材节点中添加文件。",
  "no line locked": "没有锁定台词",
  "none": "无",
  "the writer decides": "由编写模型决定",
  "auto": "自动",
  "restrained": "保守",
  "balanced": "均衡",
  "bold": "大胆",
  "extreme": "极强",
  "match": "匹配输出",
  "max": "保留原始尺寸",
  "fast": "快速",
  "standard": "标准",
  "fixed": "固定",
  "increment": "递增",
  "decrement": "递减",
  "randomize": "随机",
  "H3's native": "H3 原生尺寸",
  "768 on the short edge": "短边 768 像素",
  "no music, no line, no text": "不添加音乐、台词或文字",
  "can add music": "可添加音乐",
  "can also add words and text": "还可添加台词与画面文字",
  "pushes every choice harder": "更大胆地扩展每项选择",
  "fits each picture to the render's pixel area": "使每张图片适配输出画面的像素面积",
  "keeps the picture's own size. Stronger identity, and slower.": "保留图片原始尺寸，主体一致性更强，但速度更慢。",
  "asks the writer for reasoning prose, and is slower": "要求编写模型进行更充分的推理，速度较慢",
  "Type any number instead. H3 was trained between 5 and 15 seconds.": "也可以输入任意数值。H3 的训练时长范围为 5 至 15 秒。",
  "Bigger is sharper, slower, and eats VRAM in proportion. Type any number instead.": "尺寸越大越清晰，但速度越慢且显存占用越高；也可以输入任意数值。",
  "auto leaves the edit to the writer. A number is kept exactly.": "自动模式由编写模型决定镜头数；指定数字则会严格保留。",
  "Ambient and physical sound are always written. This decides the background music.": "环境声和实际声响始终会写入；此选项仅决定背景音乐。",
  "The same prompt and the same seed give the same brief. Change it for a different take.": "相同提示词和相同种子会得到相同方案；更换种子可生成不同版本。",
  "ComfyUI's own control. It decides whether the seed moves on the next run.": "ComfyUI 自带控制项，用于决定下次运行时种子如何变化。",
  "English": "English",
  "Spanish": "Español",
  "Portuguese": "Português",
  "French": "Français",
  "German": "Deutsch",
  "Italian": "Italiano",
  "Russian": "Русский",
  "Arabic": "العربية",
  "Chinese": "中文",
  "Japanese": "日本語",
  "Korean": "한국어",
  "Setup": "设置",
  "Point this node at the language model that writes your brief. Pick the five H3 files that render it.": "指定负责编写提示词的语言模型，并选择用于渲染的五个 H3 模型文件。",
  "your language model": "你的语言模型",
  "This model writes your brief. It also reads every picture and clip on the Media node. Any server that speaks the OpenAI API works.": "该模型负责编写提示词，也会读取素材节点中的每张图片和每段视频。任何兼容 OpenAI API 的服务均可使用。",
  "Not used. This graph compiles on another machine, which has its own language model.": "当前不使用。本工作流在另一台机器上编译，并使用那台机器的语言模型。",
  "endpoint": "接口地址",
  "model": "模型",
  "test": "测试",
  "asking": "正在请求",
  "stop": "停止",
  "nothing picked yet": "尚未选择",
  "api key": "API 密钥",
  "Only if your endpoint asks for one. It never goes into the workflow.": "仅在接口需要时填写，密钥不会写入工作流。",
  "paste the key": "粘贴密钥",
  "keep": "保存",
  "change": "更改",
  "forget": "删除",
  "delete?": "确认删除？",
  "add": "添加",
  "clear": "清空",
  "not checked": "未检查",
  "checking": "检查中",
  "vision on": "视觉已启用",
  "vision off": "视觉不可用",
  "no answer": "无响应",
  "default": "默认",
  "key set": "已设置密钥",
  "no key. That endpoint does not ask for one.": "未设置密钥；该接口不需要密钥。",
  "This ComfyUI still renders. Only the writing moves.": "视频仍由当前 ComfyUI 渲染，只有提示词编写移到远程服务。",
  "Empty. OpenH3-IR runs in this ComfyUI.": "留空时，OpenH3-IR 在当前 ComfyUI 中运行。",
  "Writing a brief is one call to your language model.": "每次编写方案只会调用语言模型一次。",
  "A GGUF checkpoint carries its own quantisation and ignores this.": "GGUF 检查点自带量化设置，因此会忽略此选项。",
  "Type any name in the field above. The list is what this server reports.": "可在上方输入任意模型名称；此列表仅显示服务器返回的模型。",
  "the five MiniMax H3 files": "五个 MiniMax H3 模型文件",
  "Pick the five H3 files. They come from your ComfyUI's own model folders.": "选择五个 H3 模型文件，文件来自当前 ComfyUI 的模型目录。",
  "compile on": "编译位置",
  "give up after": "等待上限",
  "load weights as": "权重加载格式",
  "timeout": "超时",
  "weight dtype": "权重精度",
  "runs in this ComfyUI": "在当前 ComfyUI 中运行",
  "runs at": "运行地址",
  "Stopped. Nothing changed.": "已停止，未作任何更改。",
  "Type the address of your language model first.": "请先填写语言模型接口地址。",
  "Still asking. A server that loads a model can take a minute.": "仍在请求中，服务器加载模型可能需要一些时间。",
  "That address wants a key. Type one in. Then press test again.": "该地址需要 API 密钥。填写后请再次测试。",
  "That server answers and serves no models. Load a model on it.": "服务器可以连接，但尚未加载任何模型。",
  "The server answers. It will not list its models. Type the model name in the field.": "服务器可以连接，但未返回模型列表，请手动填写模型名称。",
  "The check did not finish. Nothing is known about the model yet. Try again.": "检查未完成，暂时无法判断模型状态，请重试。",
  "The address now starts with http://.": "已自动在地址前添加 http://。",
  "Direction": "导演指导",
  "Anything your prompt in the Main node leaves open to interpretation (camera, lighting, pacing, performance, sound, etc) will follow this direction. Choose a saved director or create your own.": "主控节点提示词中未明确的内容（镜头、灯光、节奏、表演、声音等）将遵循这里的指导。你可以选择已保存的导演，也可以自定义。",
  "director": "导演",
  "name this director": "给这套导演风格命名",
  "How they shoot, shape a scene, what makes their style unique, and what kind of personality they bring to their work.": "描述其拍摄方式、场面塑造、独特风格，以及作品所呈现的个性。",
  "save": "保存",
  "overwrite?": "确认覆盖？",
  "rename": "重命名",
  "Their style": "导演风格",
  "Changes here apply immediately. Save only if you want to reuse this style later.": "这里的修改立即生效。只有需要以后复用时才需保存。",
  "the twenty camera moves": "H3 支持的 20 种运镜",
  "H3 knows these twenty by name. Write one into your direction and it reads as that move; any other wording works less well. How hard it gets played comes from the invention setting on the Main node.": "H3 能准确识别这 20 种运镜名称。将其中一个写入导演指导即可采用对应运镜；其他说法的识别效果可能较弱。运镜表现强度由主控节点的创作幅度决定。",
  "Choose it again to replace what you wrote, or save yours first.": "再次选择将覆盖当前内容，也可以先保存当前风格。",
  "Empty. This video has no director now.": "已清空，这个视频现在没有导演指导。",
  "Nothing to save yet. Write the direction first.": "暂无可保存内容，请先填写导演指导。",
  "Nothing to forget. This direction has never been saved.": "没有可删除内容，这套导演指导尚未保存。",
  "Nothing saved yet. Write a direction, give it a name, and press save.": "尚未保存任何导演指导。填写内容并命名后点击保存。",
  "no director": "无导演指导",
  "Denis Villeneuve": "丹尼斯·维伦纽瓦",
  "James Cameron": "詹姆斯·卡梅隆",
  "Kathryn Bigelow": "凯瑟琳·毕格罗",
  "Quentin Tarantino": "昆汀·塔伦蒂诺",
  "Steven Spielberg": "史蒂文·斯皮尔伯格",
  "Wes Anderson": "韦斯·安德森",
  "Wong Kar-wai": "王家卫",
  "pictures": "图片",
  "clips": "视频",
  "sounds": "音频",
  "picture": "图片",
  "clip": "视频",
  "sound": "音频",
  "What is this file to your clip?": "这个文件在视频中起什么作用？",
  "Name it to mention it, choose what it is, describe it. The brief is written from exactly these.": "为素材命名以便用 @ 引用，选择用途并添加说明；提示词将依据这些信息编写。",
  "Drop files on the board, or click an empty slot to browse. Drop one onto a filled slot to put that file in its place, keeping the name. Click a filled slot to name it and say what it is.": "将文件拖到面板，或点击空槽选择文件。拖到已有槽位可替换文件并保留名称；点击已有槽位可命名并设置用途。",
  "name": "名称",
  "what it is": "用途",
  "about it": "补充说明",
  "soundtrack": "原视频音轨",
  "in place of": "替换对象",
  "its words": "音频中的文字",
  "what it sounds like — the only description the model will ever have": "描述它听起来怎样——这是模型获得的唯一声音说明",
  "who it takes over from, in your own words: the man in the plaid shirt": "描述要替换的对象，例如：穿格子衬衫的男人",
  "the words in this recording, exactly as spoken — nothing here can hear": "逐字填写录音中的原话——此节点无法自动听取内容",
  "play": "播放",
  "in shot": "入镜",
  "setting": "场景",
  "style": "风格",
  "add to clip": "加入视频",
  "in place of": "替换对象",
  "first": "首帧",
  "last": "尾帧",
  "copy": "参考内容",
  "how it's shot": "拍摄方式",
  "edit": "编辑",
  "continue": "续写",
  "beat": "节拍",
  "sfx": "音效",
  "voice": "音色",
  "what it is: set in the editor below": "用途：可在下方编辑器中设置",
  "its words are typed in": "已填写音频中的文字",
  "its soundtrack: set in the editor below": "原视频音轨：可在下方编辑器中设置",
  "drop a picture here, or click to browse for one": "将图片拖放到这里，或点击选择文件",
  "drop a clip here, or click to browse for one": "将视频拖放到这里，或点击选择文件",
  "drop a sound here, or click to browse for one": "将音频拖放到这里，或点击选择文件",
  "what this file is to the video": "选择此文件在视频中的用途",
  "the name @ mentions this file by: letters, digits and dashes. A space becomes a dash as you type it.": "提示词用 @ 加此名称引用文件；仅支持字母、数字和连字符，输入空格时会自动变为连字符。",
  "its own soundtrack: off sends none, paired sends it as this clip's sound, alone sends it as a track in its own right": "原视频音轨：关闭时不发送；与视频配对时作为该视频的声音发送；独立音频时作为单独音轨发送。",
  "what it sounds like — the only description the model will ever have": "描述它听起来怎样——这是模型获得的唯一声音说明",
  "what it sounds like": "描述声音",
  "how the voice sounds: hoarse, unhurried, mid-forties": "描述声音特征，例如：沙哑、从容、四十多岁",
  "what it is: a heavy door slamming, close, no reverb": "描述音效，例如：近处沉重的关门声，无混响",
  "timbre, tempo, instruments: slow synth music, no drums": "描述音色、速度和乐器，例如：缓慢的合成器音乐，无鼓点",
  "the rhythm: a steady 90 bpm pulse, one hit per bar": "描述节奏，例如：稳定的 90 BPM 脉冲，每小节一下",
  "what it is, in a few words": "用简短文字描述内容",
  "something in the shot": "画面中的人物或物体",
  "the setting": "场景环境",
  "a style to copy": "参考风格",
  "add it to an existing clip": "添加到已有视频",
  "replace the one in an existing clip": "替换已有视频中的对象",
  "first frame": "首帧",
  "last frame": "尾帧",
  "storyboard": "故事板",
  "copy what is in it": "参考视频内容",
  "copy how it is shot": "参考拍摄方式",
  "edit it": "编辑此视频",
  "carry on from it": "接续此视频",
  "play it": "直接使用",
  "match its style": "匹配其风格",
  "cut to its beat": "按节拍剪辑",
  "sound effect": "音效",
  "voice to match": "匹配音色",
  "off": "关闭",
  "paired": "与视频配对",
  "alone": "独立音频",
  "described": "已有说明",
  "sound off": "音轨关闭",
  "sound paired": "音轨与视频配对",
  "sound alone": "音轨独立使用",
  "The language every locked line is spoken in. For a language not listed, name it in the prompt.": "每句锁定台词所使用的语言。列表中没有的语言，请在提示词中注明。"
}));

function configuredLocale() {
  const chosen = app.ui?.settings?.getSettingValue?.(SETTING, "auto") ?? "auto";
  if (chosen !== "auto") return chosen;
  const comfyLocale = app.ui?.settings?.getSettingValue?.("Comfy.Locale", "") ?? "";
  return /^zh(?:-|_|$)/i.test(comfyLocale || navigator.language || "") ? "zh-CN" : "en";
}

export function isChinese() { return configuredLocale() === "zh-CN"; }
export function t(value) { return isChinese() ? (ZH.get(String(value)) ?? String(value)) : String(value); }

const DIRECTOR_NAMES = new Map([
  ["丹尼斯·维伦纽瓦", "Denis Villeneuve"],
  ["詹姆斯·卡梅隆", "James Cameron"],
  ["凯瑟琳·毕格罗", "Kathryn Bigelow"],
  ["昆汀·塔伦蒂诺", "Quentin Tarantino"],
  ["史蒂文·斯皮尔伯格", "Steven Spielberg"],
  ["韦斯·安德森", "Wes Anderson"],
  ["王家卫", "Wong Kar-wai"],
]);
export function unt(value) {
  return isChinese() ? (DIRECTOR_NAMES.get(String(value)) ?? String(value)) : String(value);
}

export function slotLabel(value) {
  if (!isChinese()) return String(value);
  return String(value)
    .replace(/^picture(\d+)$/, "图片$1")
    .replace(/^video(\d+)$/, "视频$1")
    .replace(/^audio(\d+)$/, "音频$1");
}

const patterns = [
  [/^(\d+(?:\.\d+)?) seconds$/, "$1 秒"],
  [/^(\d+) characters$/, "$1 个字符"],
  [/^(\d+) of (\d+) characters$/, "$1 / $2 个字符"],
  [/^(\d+) files?$/, "$1 个文件"],
  [/^(\d+(?:\.\d+)?) megapixels$/, "$1 百万像素"],
  [/^needs (\d+(?:\.\d+)?) s$/, "至少需要 $1 秒"],
  [/^(\d+) lines? locked$/, "已锁定 $1 句台词"],
  [/^runs at (.+)$/, "运行于 $1"],
  [/^nothing in the (.+) folder$/, "$1 文件夹中没有文件"],
  [/^(.+) \(not here\)$/, "$1（文件不存在）"],
  [/^described: (.+)$/, "说明：$1"],
  [/^(.+) — the only description the model will ever have$/, (_all, prompt) => `${t(prompt)}——这是模型获得的唯一声音说明`],
  [/^sound (off|paired|alone)$/, (_all, value) => `音轨${t(value)}`],
  [/^key set, ends in (.+)$/, "已设置密钥，末尾为 $1"],
  [/^drop a (picture|clip|sound) here, or click to browse for one$/, (_all, kind) => `将${t(kind)}拖放到这里，或点击选择文件`],
  [/^@([^:]+): (.+)\. Drop a (picture|clip|sound) on it to put that file in this one's place, keeping the name\.$/, (_all, name, file, kind) => `@${name}：${file}。将${t(kind)}拖放到这里可替换文件并保留名称。`],
  [/^No Media node is connected, so @([^ ]+) names nothing\. Wire an OpenH3-IR Media node into media\.$/, "未连接素材节点，因此 @$1 没有对应素材。请将 OpenH3-IR 素材节点连接到 media。"],
  [/^@([^ ]+) is not in the tray\. Rename a slot on the Media node, or change the name here\.$/, "素材托盘中没有 @$1。请重命名素材节点中的槽位，或修改这里的名称。"],
  [/^(.+) are not in the tray\. Rename those slots on the Media node, or change the names here\.$/, "素材托盘中没有 $1。请重命名素材节点中的槽位，或修改这里的名称。"],
  [/^The tray holds (\d+) files?\. Type @ to name one in the prompt\.$/, "素材托盘中有 $1 个文件。输入 @ 可在提示词中引用。"],
  [/^Asking (.+)\.$/, "正在请求 $1。"],
  [/^Checking vision for (.+)\.$/, "正在检查 $1 的视觉能力。"],
  [/^Vision is on for (.+)\. This model is ready\.$/, "$1 已启用视觉能力，可以使用。"],
  [/^That server serves (\d+) models?\. Pick one from the list\.$/, "该服务器提供 $1 个模型，请从列表中选择。"],
  [/^That server does not serve (.+) any more\. Pick another one from the list\.$/, "服务器已不再提供 $1，请选择其他模型。"],
  [/^The key is saved for (.+)\. It is not in this workflow\.$/, "已为 $1 保存密钥，密钥不会写入工作流。"],
  [/^The key for (.+) is deleted\.$/, "已删除 $1 的密钥。"],
  [/^The test did not run\. \((.+)\)$/, "测试未能运行。（$1）"],
  [/^That address refused the key\. It said: (.+)$/, "该地址拒绝了密钥，返回：$1"],
  [/^Something answers at (.+), and it is not a language model\. Check the port (.+)$/, "$1 有服务响应，但它不是语言模型。请检查端口：$2"],
  [/^There is no machine called (.+)\. Check the spelling\.$/, "找不到名为 $1 的主机，请检查拼写。"],
  [/^Nothing answers at (.+)\. Start your language model\. If it is running, (.+)$/, "$1 没有响应。请启动语言模型；若已启动，请检查：$2"],
  [/^(.+) did not answer in 20 seconds\. It can still be starting up\. A firewall (.+)$/, "$1 在 20 秒内没有响应，可能仍在启动；也请检查防火墙：$2"],
  [/^That server serves one model, (.+)\. The field now shows it\. Checking its (.+)$/, "服务器提供一个模型 $1，已自动填入，正在检查其$2"],
  [/^(.+) rejected a request with a picture in it, so it cannot read one\. Pick one (.+)$/, "$1 拒绝了含图片的请求，因此无法读取图片。请选择$2"],
  [/^(.+) did not read the test picture\. It said: (.+)\. A graph (.+)$/, "$1 未能读取测试图片，返回：$2。工作流$3"],
  [/^That endpoint has no model called (.+)\. Nothing was asked\. Check the name (.+)$/, "该接口没有名为 $1 的模型，未发送请求。请检查名称$2"],
  [/^That endpoint refused the request as unauthorised, so (.+) was never asked\. It (.+)$/, "该接口以未授权为由拒绝请求，因此没有调用 $1。$2"],
  [/^The check did not finish\. Nothing is known about (.+) yet\. Try again\.$/, "检查未完成，暂时无法判断 $1 的状态，请重试。"],
  [/^(.+) is directing\. Edit any of it\.$/, (_all, name) => `正在使用 ${t(name)} 的导演指导，可直接编辑。`],
  [/^(.+) already exists\. Click save again to write over it\.$/, "$1 已存在，再次点击保存将覆盖它。"],
  [/^Renamed to (.+)\.$/, "已重命名为 $1。"],
  [/^Click forget again to delete (.+) for good\.$/, "再次点击删除，将永久移除 $1。"],
  [/^(.+) is gone from the list\. The box keeps its words\.$/, "$1 已从列表中删除，文本框内容仍然保留。"],
  [/^(.+) could not be read\. Nothing in the box changed\. \((.+)\)$/, "无法读取 $1，文本框内容未改变。（$2）"],
  [/^(.+) has nothing written in it\.$/, "$1 中没有导演指导内容。"],
  [/^(.+) was not saved \((.+)\)\. What is in the box is untouched\.$/, "$1 保存失败（$2），文本框内容未改变。"],
  [/^(.+) was not deleted \((.+)\)\. It is still in the list\.$/, "$1 删除失败（$2），仍保留在列表中。"],
  [/^Saved\. Pick (.+) in any graph on this ComfyUI\.(.*)$/, "已保存。现在可在当前 ComfyUI 的任意工作流中选择 $1。$2"],
  [/^Give it a name first\. That is what you will pick it by\.$/, "请先命名；之后将通过这个名称选择它。"],
  [/^A name cannot contain (.+)\.$/, "名称不能包含 $1。"],
  [/^A name cannot start with a dot\.$/, "名称不能以句点开头。"],
  [/^That name is (\d+) characters and the limit is 80\.$/, "该名称有 $1 个字符，上限为 80 个。"],
  [/^(.+): this replaces what you wrote\. Click again\.$/, "$1：这会替换当前内容，请再次点击确认。"],
  [/^Too long to run\. Trim it to (.+) characters\.$/, "内容过长，无法运行，请缩减到 $1 个字符以内。"],
  [/^sending (\d+) files…$/, "正在发送 $1 个文件…"],
  [/^drop → (.+)$/, "拖放至 → $1"],
  [/^all (\d+) (picture|clip|sound) slots are full\.$/, (_all, count, kind) => `${t(kind)}槽位已满（共 ${count} 个）。`],
  [/^the tray takes at most (\d+) files, and it is full\. A clip whose soundtrack is sent along counts as two\.$/, "素材托盘最多容纳 $1 个文件，现已满。携带原音轨的视频按两个文件计算。"],
  [/^(\d+) files could not go on: (.+)$/, "有 $1 个文件无法加入：$2"],
  [/^@(.+) holds a (picture|clip|sound), so nothing in that drop took its place\.$/, (_all, name, kind) => `@${name} 中已有${t(kind)}，这次拖放没有文件能替换它。`],
  [/^@(.+) holds a (picture|clip|sound)\.$/, (_all, name, kind) => `@${name} 中已有${t(kind)}。`],
  [/^that is not a picture, a clip or a sound\.$/, "该文件不是支持的图片、视频或音频。"],
  [/^none of those are a picture, a clip or a sound\.$/, "这些文件都不是支持的图片、视频或音频。"],
  [/^(\d+) of those are not a picture, a clip or a sound\.$/, "其中 $1 个不是支持的图片、视频或音频。"],
  [/^(.+) → @(.+)$/, "$1 → @$2"],
  [/^(.+) replaced (.+) in @(.+)(.*)$/, "$1 已替换 @$3 中的 $2$4"],
  [/^(.+) cannot go in a name: a name is letters, digits and dashes, and it follows an @\.$/, "$1 不能用于名称；名称只能包含英文字母、数字和连字符，并写在 @ 后面。"],
  [/^(.+) is taken, because @speaks\( is how a spoken line starts in the prompt\.$/, "$1 已被保留，因为提示词使用 @speaks( 开始一段锁定台词。"],
  [/^(.+) already names another slot, and case is ignored: @(.+) is the same\.$/, "$1 已用于另一个素材槽；名称不区分大小写，因此 @$2 被视为同一名称。"]
];

export function tr(value) {
  const exact = t(value);
  if (!isChinese() || exact !== value) return exact;
  for (const [re, replacement] of patterns) if (re.test(value)) return value.replace(re, replacement);
  return value;
}

function translateNode(node) {
  if (!isChinese()) return;
  const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  if (element?.closest?.(".oh3-mirror, .oh3-pick, .oh3-peek")) return;
  if (node.nodeType === Node.TEXT_NODE) {
    const raw = node.nodeValue;
    const trimmed = raw.trim();
    if (!trimmed) return;
    const next = tr(trimmed);
    if (next !== trimmed) node.nodeValue = raw.replace(trimmed, next);
    return;
  }
  if (!(node instanceof Element)) return;
  for (const attr of ["title", "placeholder", "aria-label"]) {
    const raw = node.getAttribute(attr);
    const next = raw ? tr(raw) : raw;
    if (raw && next !== raw) node.setAttribute(attr, next);
  }
  for (const child of node.childNodes) translateNode(child);
}

export function localize(root) {
  if (!root || !isChinese()) return root;
  translateNode(root);
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === "characterData") translateNode(record.target);
      if (record.type === "attributes") translateNode(record.target);
      for (const node of record.addedNodes) translateNode(node);
    }
  });
  observer.observe(root, { childList: true, subtree: true, characterData: true,
                           attributes: true, attributeFilter: ["title", "placeholder", "aria-label"] });
  return root;
}

app.registerExtension({
  name: "openh3ir.i18n",
  setup() {
    app.ui?.settings?.addSetting?.({
      id: SETTING,
      name: "OpenH3-IR / Language（语言）",
      type: "combo",
      options: [
        { value: "auto", text: "Auto（自动）" },
        { value: "en", text: "English" },
        { value: "zh-CN", text: "简体中文" }
      ],
      defaultValue: "auto",
      tooltip: "Reload ComfyUI after changing this setting. / 更改后请刷新 ComfyUI。"
    });
  },
  beforeRegisterNodeDef(nodeType, nodeData) {
    const titles = {
      OpenH3IRCompile: "OpenH3-IR Main",
      OpenH3IRSetup: "OpenH3-IR Setup",
      OpenH3IRDirector: "OpenH3-IR Director",
      OpenH3IRMedia: "OpenH3-IR Media"
    };
    const english = titles[nodeData?.name];
    if (!english || !isChinese()) return;
    nodeData.display_name = t(english);
    nodeType.title = t(english);
    const created = nodeType.prototype.onNodeCreated;
    nodeType.prototype.onNodeCreated = function () {
      const result = created?.apply(this, arguments);
      if (!this.title || this.title === english) this.title = t(english);
      const localizeSlots = () => {
        for (const slot of [...(this.inputs || []), ...(this.outputs || [])]) {
          const source = slot?.name || slot?.label;
          if (source) slot.label = t(source);
        }
        this.setDirtyCanvas?.(true, true);
      };
      localizeSlots();
      globalThis.requestAnimationFrame?.(localizeSlots);
      return result;
    };
  }
});
