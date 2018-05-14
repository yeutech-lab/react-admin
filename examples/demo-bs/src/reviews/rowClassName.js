const rowClassName = (record, defaultStyle = {}) => {
    if (record.status === 'accepted')
        return 'success';
    if (record.status === 'pending')
			  return 'warning';
    if (record.status === 'rejected')
			  return 'danger';
    return defaultStyle;
};

export default rowClassName;
