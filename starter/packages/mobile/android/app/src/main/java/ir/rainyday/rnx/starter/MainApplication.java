package ir.rainyday.rnx.starter;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import com.reactcommunity.rnlocalize.RNLocalizePackage;

import java.util.Arrays;
import java.util.List;

import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;

import ir.rainyday.rnx.starter.module.config.ReactNativeConfigPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new ReactNativeConfigPackage(),
                    new VectorIconsPackage(),
                    new SplashScreenReactPackage(),
                    new RNLocalizePackage(),
                    new NetInfoPackage(),
                    new ReactNativeRestartPackage(),
                    new SvgPackage(),
                    new RNDeviceInfo()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
