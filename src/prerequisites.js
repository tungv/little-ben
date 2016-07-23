import injectTapEventPlugin from 'react-tap-event-plugin';
require('react-hot-loader/patch');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import moment from 'moment';
moment.locale('vi');
