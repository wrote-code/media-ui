call git checkout master
call git checkout .
call git pull
call git branch -vv
call git log --oneline --all -5
call npm run build
cmd /k