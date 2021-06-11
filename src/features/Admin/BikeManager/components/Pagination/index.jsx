import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));
PaginationCompnent.propTypes = {

};



function PaginationCompnent({ filter, pagination, setFilter }) {
    const totalPage = Math.ceil(pagination.total / pagination.PageSize);
    const handleOnchange = (e, page) => {
        setFilter({ ...filter, PageNumber: page })
    }
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Pagination style={{ float: 'right' }} shape="rounded" count={totalPage} color="primary" onChange={handleOnchange} />
        </div>
    );

}

export default PaginationCompnent;