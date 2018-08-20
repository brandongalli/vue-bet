output=`command yarn run wdio-headless`
echo -e "\`\`\`bash\n${output}\n\`\`\`" > ../../wdio.log
sudo cp ../../wdio.log /home/ajay_kumar_awscloud/experience-engine/platform/public/e2eTestDocs/logs/biHourlyTest
sudo cp *.png /home/ajay_kumar_awscloud/experience-engine/platform/public/e2eTestDocs/images/biHourlyTest
sudo mv /home/ajay_kumar_awscloud/experience-engine/platform/public/e2eTestDocs/logs/biHourlyTest/wdio.log /home/ajay_kumar_awscloud/experience-engine/platform/public/e2eTestDocs/logs/biHourlyTest/wdio.md
sudo pandoc /home/ajay_kumar_awscloud/experience-engine/platform/public/e2eTestDocs/logs/biHourlyTest/wdio.md -f markdown -t html -s -o /home/ajay_kumar_awscloud/experience-engine/platform/public/e2eTestDocs/logs/biHourlyTest/wdio-log.html
cd /home/ajay_kumar_awscloud/experience-engine/platform/public/e2eTestDocs/logs/biHourlyTest
sudo tree -H '.' -L 1 --noreport --charset utf-8 -P "*.html" -I "index.html" > index.html
cd ../../images/biHourlyTest
sudo tree -H '.' -L 1 --noreport --charset utf-8 -P "*.png" -I "index.html" > index.html
