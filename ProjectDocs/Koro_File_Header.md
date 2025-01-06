### 安装
1. 打开 VSCode，点击左侧扩展商店图标，搜索 `koroFileHeader` 插件，点击安装。
2. 如果快捷键有冲突，可以自行替换快捷键。

### 配置
1. 打开设置文件：文件 -> 首选项 -> 设置，搜索 `fileheader`，点击 "在 settings.json 中编辑"。
2. 在 `settings.json` 文件中配置注释模板，例如：
   ```json
   "fileheader.customMade": {
        //此为头部注释
        "Description": "",
        "Version": "V1.0.0",
        "Author":"git config user.name && git config user.email", 
        "Date": "Do not edit",
        "LastEditors": "git config user.name && git config user.email",
        "LastEditTime": "Do not edit",
        "FilePath": "only file name", 
            // 版权声明 保留所有权利 自动替换年份
        "custom_string_obkoro1_copyright": "Copyright ${now_year} Marvin, All Rights Reserved. ",
        "custom_string_obkoro1_date": "Do not edit", // 版权时间
    },
    "fileheader.cursorMode": {
        //此为函数注释
        "description": "",
        "param": "",
        "return": "",
        "Date": "Do not edit",
        "Author": "git config user.name && git config user.email",
        "LastEditors": "git config user.name && git config user.email",
        "LastEditTime": "Do not edit"
    },
    "fileheader.configObj": {
        "createFileTime": false,
        "language": {
            "languagetest": {
                "head": "/$$",
                "middle": " $ @",
                "end": " $/",
                "functionSymbol": {
                    "head": "/** ",
                    "middle": " * @",
                    "end": " */"
                },
                "functionParams": "js"
            }
        },
        "autoAdd": false, // 自动添加头部注释是否开启，默认为true
        "autoAddLine": 100,
        "autoAlready": true,
        "annotationStr": {
            "head": "/*",
            "middle": " * @",
            "end": " */",
            "use": false
        },
        "headInsertLine": {
            "php": 2,
            "sh": 2
        },
        "beforeAnnotation": {
            "文件后缀": "该文件后缀的头部注释之前添加某些内容"
        },
        "afterAnnotation": {
            "文件后缀": "该文件后缀的头部注释之后添加某些内容"
        },
        "specialOptions": {
            "特殊字段": "自定义比如LastEditTime/LastEditors"
        },
        "switch": {
            "newlineAddAnnotation": true
        },
        "supportAutoLanguage": [],
        "prohibitAutoAdd": ["json", "md"], // 禁止自动添加头部注释的文件类型
        "folderBlacklist": ["node_modules", "文件夹禁止自动添加头部注释"],
        "prohibitItemAutoAdd": ["项目的全称, 整个项目禁止自动添加头部注释, 可以使用快捷键添加"],
        "moveCursor": true,
        "dateFormat": "YYYY-MM-DD HH:mm:ss",
        "atSymbol": ["@", "@"],
        "atSymbolObj": {
            "文件后缀": ["头部注释@符号", "函数注释@符号"]
        },
        "colon": [": ", ": "],
        "colonObj": {
            "文件后缀": ["头部注释冒号", "函数注释冒号"]
        },
        "filePathColon": "路径分隔符替换",
        "showErrorMessage": false,
        "writeLog": false,
        "wideSame": true,
        "wideNum": 13, // 头部注释自动对齐的宽度
        "functionWideNum": 15, // 函数注释自动对齐宽度
        "CheckFileChange": true,
        "createHeader": true,
        "useWorker": false,
        "designAddHead": false,
        "headDesignName": "random", // 头部图案注释，默认随机
        "headDesign": false, // 默认关闭 开启后,所有生成头部注释的场景都会生成图案注释
        "cursorModeInternalAll": {},
        "openFunctionParamsCheck": true,
        "functionParamsShape": ["{", "}"],
        "functionBlankSpaceAll": {},
        "functionTypeSymbol": " ", // 参数没有类型时的默认值
        "typeParamOrder": "type param",
        "customHasHeadEnd": {},
        "throttleTime": 60000,
        "functionParamAddStr": "",
    }
   ```
   这里的 `fileheader.cursorMode` 是函数注释的配置，`fileheader.customMade` 是文件头注释的配置。
3. 保存配置文件后，重启 VSCode。

### 使用
- **文件头部注释**：在当前编辑文件中使用快捷键 `Ctrl + Alt + I`（Windows/Linux）或 `Ctrl + Cmd + I`（Mac），即可在文件头部生成注释。
- **函数注释**：
  - 将光标放在函数行或者将光标放在函数上方的空白行。
  - 使用快捷键 `Ctrl + Alt + T`（Windows/Linux）或 `Ctrl + Cmd + T`（Mac），即可生成函数注释。
  - 生成函数注释后，使用快捷键 `Win + Y`（Windows）、`Cmd + Y`（Mac）或 `Meta + Y`（Linux），可以快速为函数参数添加描述。

### 其他功能
- **多行函数参数自动提取**：鼠标左键选择多行函数声明区域，然后按函数注释快捷键，即可自动提取函数参数。
- **自定义配置**：可以根据个人需求修改 `settings.json` 文件中的注释模板和配置项。

### 注意事项
- 如果快捷键不可用，可能是被其他插件或系统快捷键占用了，可以尝试修改快捷键或检查快捷键设置。
- 该插件支持所有主流编程语言，可以根据不同语言的注释格式进行配置。
