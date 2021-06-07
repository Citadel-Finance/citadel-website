import Vue from 'vue';

import BaseBtn from '~/components/ui/BaseBtn';
import BaseInput from '~/components/ui/BaseInput';
import BaseRadio from '~/components/ui/BaseRadio';
import CtmModal from '~/components/CtmModal';
import CtmModalBox from '~/components/CtmModal/CtmModalBox';
import LoaderScreen from '~/components/widgets/LoaderScreen';

Vue.component('base-btn', BaseBtn);
Vue.component('base-input', BaseInput);
Vue.component('base-radio', BaseRadio);
Vue.component('ctm-modal', CtmModal);
Vue.component('ctm-modal-box', CtmModalBox);
Vue.component('loader-screen', LoaderScreen);
