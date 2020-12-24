import moment from 'moment';

const formatDate = () => moment(new Date()).format('dddd of MMMM Do YYYY, h:mm a');

export default formatDate;