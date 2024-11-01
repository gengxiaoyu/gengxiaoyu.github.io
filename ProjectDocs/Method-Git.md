## 一、git下载用法
```js 
// 1、下载项目：
git clone <仓库地址> 
// 2、如果要下载非master的某分支代码：
git clone -b <分支名> <仓库地址> 
```

## 二、提交用户名和电子邮件
```js 
$ git config --global user.name "Some One"
$ git config --global user.email "someone@gmail.com"
```

## 三、代码提交
```js 
// 1、新建一个git库
git init
// 2、查看目前状态
git status
// 3、添加文件从工作区到暂存区
git add <文件名>
// 4、从暂存区提交到代码仓库
git commit -m “提示信息”
// 5、查看提交commit的信息
git log
// 6、添加远程指针
git remote add origin https://github.com/try-git/try_git.git
// 7、将本地的master分支推送到远程origin主机，-u参数表示记住对应关系，下次可以直接git push推送。
git push -u origin master
// 8、将远程主机origin的代码取回本地，与本地的master分支合并
git pull origin master
// 8、查看与上一次commit的区别
git diff HEAD
```

## 四、git从master建立分支
```js 
// 1、首先，进入master分支:
git checkout master
// 2、拉取master最新项目到本地master分支:
git pull 
// 3、创建新分支dev并把当前master分支内容复制一份到新分支dev中：
git checkout -b dev
// 4、把新建分支dev推送到远端：
git push origin dev
// 5、将远端的dev分支和本地的dev分支关联起来：
git branch --set-upstream-to=origin/dev
// 6、验证创建的分支是否成功：
git pull 当出现Already up to date，代表该分支创建成功。
```

## 五、分支代码合并到主分支
```js 
// 1、首先切换到自己的分支(比如分支叫：dev)
git checkout dev
// 2、把本地分支拉取下来
git pull 或者 git pull origin dev
// 3、切换到主分支master
git checkout master
// 4、合并代码到主分支上
git merge dev
// 5、可以 git status 检查一下是否合并成功，是否有冲突
git push 或者 git push origin master
```

## 六、主分支代码拉取到自己分支上
```js 
// 1、首先检查自己现在在哪个分支，如果在dev开发分支，看是否有最新代码没有提交，如果有，先 git add . git commit -m 提交本地代码、提交完之后，切换到主分支
git checkout master
// 2、把主分支代码拉取下来
git pull 或者 git pull origin master
// 3、切换到开发分支dev
git checkout dev
// 4、合并主分支的代码到开发分支上
git merge master
// 5、可以 git status 检查一下是否合并成功，是否有冲突
// 6、检查没问题，推送代码
git commit -m ""  -->  git push 或者 git push origin dev
```

## 七、创建一个空的分支
```js 
// 1、使用checkout命令新建一个空白分支
git checkout --orphan newbranch
// 2、删除单个文件或文件集合
git rm -rf .
// 3、因为空分支是不可见的，所以初始化一下
touch .gitignore
// 4、将指定文件放入暂存区
git add .gitignore
// 5、将文件从工作区提交到仓库区
git commit -m "Init an empty branch"
// 6、将远端的newbranch分支和本地的newbranch分支关联起来：
git branch --set-upstream-to=origin/newbranch
```

## 八、'摘樱桃'同步部分提交
```js 
// 1、分支提交 生成commit ID(dev)
git push
// 2、切换分支(dev01)
git checkout dev01
// 3、git cherry-pick commit ID 会报错
git cherry-pick -m 1 commit ID命令告诉cherry-pick命令计算diff的
// 3-1、报错(dev01|CHERRY-PICKING) 
//git樱桃采摘--继续
git cherry-pick --continue
//git樱桃采摘--跳过
git cherry-pick --skip
//git樱桃采摘--中止
git cherry-pick --abort
// 4、将指定文件放入暂存区
git add .
// 5、本地的分支版本上传到远程并合并
git push 
```

## 九、回退版本
```js 
// 1、回退到上一个版本
git reset –hard HEAD^
// 2、回退到上2个版本
git reset –hard HEAD~2
// 3、回退到指定版本，可以先git log查看版本号
git reset --hard 版本号
```

## 十一、分支
```js 
// 1、列出本地的所有分支
git branch
// 2、创建一个名为MyBranch的新分支，但是依然停留在当前分支。
git branch MyBranch
// 3、在远程主机origin上创建一个MyBranch的分支，并与本地的同名分支建立追踪关系。
git push -u origin MyBranch
// 4、将当前分支改名为MyBranch。
git branch -m MyBranch
// 5、删除MyBranch分支，前提是该分支没有未合并的变动。
git branch -d MyBranch
// 6、强制删除MyBranch分支，不管有没有未合并变化。
git branch -D MyBranch
// 7、切换到MyBranch分支，当前的工作区会变为MyBranch分支的内容。。
git checkout MyBranch
// 8、基于MyBranch分支创建一个新的NewBranch分支，新的NewBranch分支将成为当前的工作区。
git checkout -b NewBranch MyBranch
```

## 十二、发布一个版本
```js 
// 1、为当前分支打上版本号
$ git tag -a [VERSION] -m "released [VERSION]"
$ git push origin [VERSION]
```

友情链接：
1.  [阮一峰 Git 教程](https://www.bookstack.cn/read/git-tutorial/docs-basic.md)




