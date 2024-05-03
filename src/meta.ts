import {type GmkWindow} from "/src/index-related/index-renderer";

(window as unknown as GmkWindow).buildInfo = {
    version: '{{APP_VERSION}}',
    vcHash: '{{GIT_COMMIT_ID}}',
    buildAt: '{{BUILD_AT}}'
}