/* eslint dot-notation: 'off', new-cap: 'off' */
const v = {};

// -----------------
// BOOTSTRAP OVERRIDE
// -----------------

v['$enable-transitions'] = true;
v['$enable-rounded'] = false;
v['$body-bg'] = '#f8f8f8';
v['$body-color'] = '#292B2C';
v['$green'] = '#138D75';
v['$blue'] = '#040a59';
v['$brand-primary'] = '#138D75';
v['$brand-success'] = '#2eb82e';
v['$brand-info'] = '#0084ad';
v['$brand-warning'] = '#b7007a';
v['$brand-danger'] = '#b70000';
v['$brand-inverse'] = '#292B2C';
v['$font-size-base'] = '15px';

// ALERT

v['$alert-info-border'] = 'transparent';
v['$alert-info-bg'] = v['$blue'];
v['$alert-info-text'] = 'white';

// FORMS
v['$input-padding-x'] = '.5rem';
v['$input-padding-y'] = '.5rem';
v['$input-line-height'] = '1';
v['$input-btn-border-width'] = '1px';

// CARDS

v['$card-columns-count'] = '2';

//TABLES

v['$table-cell-padding'] = '.5rem .75rem';
// 7. Grid containers
//
// Define the maximum width of `.container` for different screen sizes.

v['$container-max-widths'] = {
	sm: '540px',
	md: '720px',
	lg: '960px',
	xl: '1140px',
};


// 8. ListGroup

v['$list-group-active-bg'] = 'transparent';
v['$list-group-active-color'] = v['$brand-primary'];
v['$list-group-bg'] = 'transparent';

export default v;
