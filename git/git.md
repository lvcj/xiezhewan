>新建分支
git checkout develop
git pull origin develop
git checkout -b myfeature
 
>在分支上开发
git add ***
git commit -m "*****"
 
>在分支开发过程中合并develop分支到本分支（先把自己的工作commit到本地）
git checkout develop
git pull origin develop
git checkout myfeature
git merge develop
 
>（如果没有冲突，就继续开发，如果有冲突，执行下面过程）
首先在本地解决冲突，再把冲突解决commit
git add ***
git commit -m "*****"
 
>在分支开发结束，需要将本分支合并到develop分支（先把自己的工作commit到本地）
git checkout develop
git pull origin develop
git merge myfeature
 
（如果没有冲突，就推送到远程）
git push origin develop
（如果有冲突，则解决冲突，再commit，并推送到远程：）
git add ***
git commit -m "*****"
git push origin develop