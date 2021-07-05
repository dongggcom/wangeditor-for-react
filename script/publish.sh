#!/bin/bash
###
 # @Author: donggg
 # @LastEditors: donggg
 # @Date: 2021-05-12 14:41:00
 # @LastEditTime: 2021-07-05 16:49:36
### 

# 1. 锁定分支
git checkout main

# 2. 打包
npm run build

echo ''
echo '----------------------------------'
echo '--------- build success! ---------'
echo '----------------------------------'
echo ''

# 3. 更新版本号: enter the version(*.*.*): 
enter_version() {
    default_version=$(node -e "const pkg=require('./package.json'); console.log(pkg.version);")
    read -p "Enter the version($default_version):" version
    
    if [ ! $version ]
    then
      version_log=$(npm version $default_version)
      version=${default_version}
    else
      version_log=$(npm version $version)
    fi
}
enter_version

# 4. 发布
npm publish

echo ''
echo '----------------------------------'
echo '- publish finished and read log --'
echo '----------------------------------'
echo ''

# 5. 输入需要合并的提交记录 enter the scope of commit: 
commit_log() {
  scope=$1
  log=$(git log -${scope} --pretty=format:"%ar : %s" )

  echo "${log}"

}

show_commit_scope() {
  scope=$1
  commit_log $scope

  echo ''
  echo '----------------------'
  read -p "Show more? (No|Yes)" more

  if [ ! $more ]
  then
    return
  fi

  if [ $more == "y" ] || [ $more == "yes" ] || [ $more == "Y" ] || [ $more == "YES" ] || [ $more == "Yes" ]
  then
    scope=$(($scope+5))

    show_commit_scope $scope
  fi
}

show_commit_scope 5

# 6. 确认后生成 CHANGELOG
create_change_log() {

  echo ''
  read -p "Automatically fill CHANGELOG.md from commit-log? (No|Yes)" more

  if [ ! $more ]
  then
    return
  fi

  if [ $more == "y" ] || [ $more == "yes" ] || [ $more == "Y" ] || [ $more == "YES" ] || [ $more == "Yes" ]
  then
    log=$(git log -${scope} --pretty=format:"- %s" )
    date=$(date "+%Y-%m-%d")
    changelog="## $version - ${date}" 

    echo ''
    echo -e "${changelog}\n${log}"
  fi

}
create_change_log

# 7. 更新仓库
echo ''
echo '----------------'
read -p "finish? (Yes|No)" is_continue

if [ !$is_continue ] || [ $is_continue == "y" ] || [ $is_continue == "yes" ] || [ $is_continue == "Y" ] || [ $is_continue == "YES" ] || [ $is_continue == "Yes" ]
then
  git add .
  git commit -m "${version} CHANGELOG" --no-verify
  git push
fi

