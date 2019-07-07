#! /bin/bash
read -p "   <<<<<< Enter Your Project Name: "  projectName
read -p "   <<<<<< Enter Your Project Id (Android applicationId and iOS bundleId): "  projectId
#read -p "   <<<<<< Enter Your Project iOS Deployment Target (default is 9.0): "  deployTarget
#read -p "   <<<<<< Enter Your Project Android minSDKVersion (default is 17): "  minSDK
read -p "   <<<<<< Select Your App Theme (material/apple/platform, default is platform): "  appTheme
read -p "   <<<<<< Select Your App Template (tab/drawer/platform, default is platform): "  appTemplate
read -p "   <<<<<< Select Your App Region (fa/en, default is fa): "  appRegion

echo ""
echo "   >>>>>> Initializing project... , please wait"
echo ""

# rename propject folder
mv starter $projectName
cd $projectName
projectDir=$(pwd)
packagePath="${projectId//./$'/'}"

 set app region
region="Constant.LOCALE_FA"
if [ "$appRegion" == "en" ]; then
region="Constant.LOCALE_EN"
cd "$projectDir/packages/mobile/ios/starter"
find . -name 'AppDelegate.m' -print0 | xargs -0 sed -i "" "s/forceRTL:YES/forceRTL:NO/g"
cd "$projectDir/packages/mobile/android/app/src/main/java/ir/rainyday/rnx/starter"
find . -name 'MainActivity.java' -print0 | xargs -0 sed -i "" "s/forceRTL(this, true)/forceRTL(this, false)/g"
fi
echo "   >>>>>> Set App region to '$appRegion'"
cd "$projectDir/packages/common/src/configs"
find . -name 'const.ts' -print0 | xargs -0 sed -i "" "s/Constant.LOCALE_FA/$region/g"
echo ""

# set theme
theme="ThemeOption.BasedOnPlatform"
if [ "$appTheme" == "material" ]; then
theme="ThemeOption.ForceMaterial"
elif [ "$appTheme" == "apple" ]; then
theme="ThemeOption.ForceApple"
fi
echo "   >>>>>> Set app theme to '$appTheme'"
cd "$projectDir/packages/common/src/configs"
find . -name 'theme.ts' -print0 | xargs -0 sed -i "" "s/const NATIVE_THEME = ThemeOption.BasedOnPlatform/const NATIVE_THEME = $theme/g"
echo ""

# set template
template="NavigationOption.BasedOnPlatform"
if [ "$appTemplate" == "drawer" ]; then
template="NavigationOption.ForceDrawer"
elif [ "$appTemplate" == "tab" ]; then
template="NavigationOption.ForceTab"
fi
echo "   >>>>>> Set app template to '$appTemplate'"
cd "$projectDir/packages/common/src/navigators"
find . -name 'mainNavigator.ts' -print0 | xargs -0 sed -i "" "s/const NATIVE_NAV = NavigationOption.BasedOnPlatform/const NATIVE_NAV = $template/g"
cd "$projectDir"
echo ""

# set app id
echo "   >>>>>> Set App Id... , please wait"
find . \( ! -iname ".*" \) -type f -print0 | LC_CTYPE=C xargs -0 sed -i '' -e 's/ir.rainyday.rnx.starter/$projectId/g';
cd "$projectDir/packages/mobile/android/app/src/main/java"
mv ir _t
mkdir -p "$packagePath"
cp -r _t/rainyday/rnx/starter/* "$packagePath"
rm -r _t
echo ""


# set android sdk dir
cd "$projectDir/packages/mobile/android"
find . -name 'local.properties' -print0 | xargs -0 sed -i "" "s/mostafa-taghipour/$USER/g"
cd "$projectDir"

# set app name
echo "   >>>>>> Set App name... , please wait"
find . \( ! -iname ".*" \) -type f -print0 | LC_CTYPE=C xargs -0 sed -i '' -e 's/starter/$projectName/g';
echo ""

# rename directories and files
echo "   >>>>>> Rename directories... , please wait"
directories=( `find . \( -iname "projectName*" ! -iname ".*" \) -type d` )
for dirname in "${directories[@]}"
do
newname="${dirname/starter/$projectName}"
mv "$dirname" "$newname"
echo "$dirname renamed"
done
echo ""

echo "   >>>>>> Rename files... , please wait"
files=( `find . \( -iname "projectName*" ! -iname ".*" \) -type f` )
for filename in "${files[@]}"
do
newname="${filename/starter/$projectName}"
mv "$filename" "$newname"
echo "$filename renamed"
done
' _ {} +
echo ""


# install dependencies
echo "   >>>>>> Installing dependencies... , please wait"
yarn --ignore-engines

open "$projectName.code-workspace"
echo "   >>>>>> Successfully finished"
cd ../
rm -R screenshots
rm -R README.md
rm -- "$0"


