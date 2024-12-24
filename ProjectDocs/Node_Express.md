### 从0到1创建一个简单的Node.js + Express.js应用

以下是一个详细的步骤指南，帮助您从头开始创建一个简单的Node.js + Express.js应用。我们将创建一个基本的博客系统，包括用户登录、注册、发表文章和删除文章等功能。

#### 1. 初始化项目

首先，创建一个新的项目目录并初始化项目：

```sh
mkdir simple-blog
cd simple-blog
npm init -y
```

这将创建一个 `simple-blog` 目录，并在其中生成一个 `package.json` 文件，记录项目的依赖和其他元数据。

#### 2. 安装必要的依赖

安装 Express.js 和其他必要的依赖：

```sh
npm install express body-parser mongoose
```

- **Express.js**: 用于创建 Web 服务器。
- **body-parser**: 用于解析请求体中的 JSON 数据。
- **mongoose**: 用于连接 MongoDB 数据库并操作数据。

#### 3. 创建主应用文件

在项目根目录下创建一个 `app.js` 文件，这是应用的入口文件：

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');

const app = express();
const PORT = process.env.PORT || 3000;

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/simple-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('数据库连接成功');
}).catch(err => {
  console.error('数据库连接失败:', err);
});

// 使用 body-parser 中间件来解析 JSON 格式的请求体
app.use(bodyParser.json());

// 引入用户模块路由
app.use('/user', userRoutes);

// 引入文章模块路由
app.use('/article', articleRoutes);

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
```

#### 4. 创建用户模块路由

在项目根目录下创建一个 `routes` 文件夹，并在其中创建一个 `user.js` 文件：

```javascript
const express = require('express');
const router = express.Router();

// 用户登录
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // 假设这里有一个简单的用户验证逻辑
  if (username === 'admin' && password === 'password') {
    res.status(200).send({ message: '登录成功', token: 'your-token' });
  } else {
    res.status(401).send({ message: '用户名或密码错误' });
  }
});

// 用户注册
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  // 假设这里有一个简单的用户注册逻辑
  console.log(`新用户注册: ${username}`);
  res.status(200).send({ message: '注册成功' });
});

// 导出路由
module.exports = router;
```

#### 5. 创建文章模块路由

在 `routes` 文件夹中创建一个 `article.js` 文件：

```javascript
const express = require('express');
const router = express.Router();

// 发表文章
router.post('/articles', (req, res) => {
  const { title, content } = req.body;
  // 假设这里有一个简单的文章保存逻辑
  console.log(`新文章: ${title}`);
  res.status(200).send({ message: '文章发表成功' });
});

// 删除文章
router.delete('/articles/:id', (req, res) => {
  const { id } = req.params;
  // 假设这里有一个简单的文章删除逻辑
  console.log(`删除文章: ${id}`);
  res.status(200).send({ message: '文章删除成功' });
});

// 导出路由
module.exports = router;
```

#### 6. 创建用户和文章的数据模型

在项目根目录下创建一个 `models` 文件夹，并在其中创建一个 `User.js` 文件和一个 `Article.js` 文件。

##### 6.1 `User.js`

```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
```

##### 6.2 `Article.js`

```javascript
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
```

#### 7. 更新路由文件以使用数据模型

更新 `user.js` 和 `article.js` 文件，使其使用刚刚创建的数据模型。

##### 7.1 更新 `user.js`

```javascript
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 用户登录
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).send({ message: '登录成功', token: 'your-token' });
    } else {
      res.status(401).send({ message: '用户名或密码错误' });
    }
  } catch (err) {
    res.status(500).send({ message: '服务器错误', error: err.message });
  }
});

// 用户注册
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(200).send({ message: '注册成功' });
  } catch (err) {
    res.status(500).send({ message: '服务器错误', error: err.message });
  }
});

// 导出路由
module.exports = router;
```

##### 7.2 更新 `article.js`

```javascript
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const User = require('../models/User');

// 发表文章
router.post('/articles', async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const author = await User.findById(authorId);
    if (!author) {
      return res.status(404).send({ message: '用户不存在' });
    }
    const newArticle = new Article({ title, content, author: author._id });
    await newArticle.save();
    res.status(200).send({ message: '文章发表成功' });
  } catch (err) {
    res.status(500).send({ message: '服务器错误', error: err.message });
  }
});

// 删除文章
router.delete('/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).send({ message: '文章不存在' });
    }
    res.status(200).send({ message: '文章删除成功' });
  } catch (err) {
    res.status(500).send({ message: '服务器错误', error: err.message });
  }
});

// 导出路由
module.exports = router;
```

#### 8. 启动 MongoDB 服务

确保 MongoDB 服务正在运行。如果您使用的是本地 MongoDB，可以通过以下命令启动：

```sh
mongod
```

#### 9. 运行应用

在项目根目录下运行应用：

```sh
node app.js
```

### 测试服务器

#### 使用 Postman 或 curl 测试 API

##### 9.1 测试用户注册

- **Postman**:
  - 创建一个新的 POST 请求。
  - 设置 URL 为 `http://localhost:3000/user/register`。
  - 在请求体中选择 `raw` 并设置格式为 `JSON`。
  - 输入 JSON 数据，例如：`{"username": "testuser", "password": "testpassword"}`。
  - 发送请求，查看响应。

- **curl**:
  - 在终端或命令行中执行以下命令：
  ```sh
  curl -X POST http://localhost:3000/user/register -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpassword"}'
  ```

##### 9.2 测试用户登录

- **Postman**:
  - 创建一个新的 POST 请求。
  - 设置 URL 为 `http://localhost:3000/user/login`。
  - 在请求体中选择 `raw` 并设置格式为 `JSON`。
  - 输入 JSON 数据，例如：`{"username": "testuser", "password": "testpassword"}`。
  - 发送请求，查看响应。

- **curl**:
  - 在终端或命令行中执行以下命令：
  ```sh
  curl -X POST http://localhost:3000/user/login -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpassword"}'
  ```

##### 9.3 测试发表文章

- **Postman**:
  - 创建一个新的 POST 请求。
  - 设置 URL 为 `http://localhost:3000/article/articles`。
  - 在请求体中选择 `raw` 并设置格式为 `JSON`。
  - 输入 JSON 数据，例如：`{"title": "Test Article", "content": "This is a test article.", "authorId": "your-author-id"}`。
  - 发送请求，查看响应。

- **curl**:
  - 在终端或命令行中执行以下命令：
  ```sh
  curl -X POST http://localhost:3000/article/articles -H "Content-Type: application/json" -d '{"title": "Test Article", "content": "This is a test article.", "authorId": "your-author-id"}'
  ```

##### 9.4 测试删除文章

- **Postman**:
  - 创建一个新的 DELETE 请求。
  - 设置 URL 为 `http://localhost:3000/article/articles/your-article-id`。
  - 发送请求，查看响应。

- **curl**:
  - 在终端或命令行中执行以下命令：
  ```sh
  curl -X DELETE http://localhost:3000/article/articles/your-article-id
  ```

### 总结

通过以上步骤，您可以从头开始创建一个简单的 Node.js + Express.js 应用。这个应用包括用户注册、登录、发表文章和删除文章等基本功能。您可以在此基础上继续扩展，添加更多的功能和优化代码。希望这些示例对您有所帮助！