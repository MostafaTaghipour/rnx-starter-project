package ir.rainyday.rnx.starter;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.modules.i18nmanager.I18nUtil;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
        I18nUtil.getInstance().allowRTL(this, true);
         I18nUtil.getInstance().forceRTL(this, true);
    }
    @Override
    protected String getMainComponentName() {
        return "starter";
    }
}
