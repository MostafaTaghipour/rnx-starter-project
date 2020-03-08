package ir.rainyday.rnx.starter.module.config;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import ir.rainyday.rnx.starter.BuildConfig;

import java.util.HashMap;
import java.util.Map;

public class ReactNativeConfig extends ReactContextBaseJavaModule {
    public ReactNativeConfig(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Override
    public String getName() {
        return "ReactNativeConfig";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("buildEnvironment", BuildConfig.ENVIRONMENT);
        return constants;
    }
}