import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import productApi from '../../../../../api/productApi';
import PaginationCompnent from '../Pagination';

MainTable.propTypes = {

};


function MainTable({ }) {

    const [filter, setFilter] = useState({
        PageNumber: 1,
        PageSize: 10,
        totalPage: 1,
    });

    const [pagination, setPagination] = useState({
        total: 50,
        page: 1,
        PageSize: 10,
    });


    useEffect(() => {
        fetchDataFormApi();
        // eslint-disable-next-line
    }, [filter]);
    const [bikes, setBikes] = useState([]);
    const fetchDataFormApi = async () => {
        const response = await productApi.getAll(filter);
        const bikeFromApi = response.data;
        setBikes(bikeFromApi);
        setPagination(response.pagination);
    } //fetch data base on filter




    const handleDelete = (id) => {
        console.log(id);
    }


    //search san pham tren table
    const form = useForm();
    const { register, handleSubmit } = form;
    const handleSearch = (value) => {
        const searchValue = value.search;
        const searchBy = value.searchBy;
        setFilter({ ...filter, value: searchValue, searchBy });

    }


    //xu ly so sp hien thi tren table
    const handleNumberInPage = (e) => {
        const numberInPages = e.target[e.target.selectedIndex].getAttribute('value');
        setFilter({ ...filter, PageSize: numberInPages });
    }

    //xu ly so tien cua sp hien thi tren table
    const handlePrice = (e) => {
        const priceOfBike = e.target[e.target.selectedIndex].getAttribute('value');
        setFilter({ ...filter, priceOfBike });

    }




    return (
        <div className="row">
            <div className="col-md-12">
                {/* Advanced Tables */}
                <a href="/admin/bikes/create" className="btn icon-btn btn-success" style={{ marginBottom: '0.5em' }}>
                    <span className="glyphicon btn-glyphicon glyphicon-plus img-circle text-success " />
                                    Create A New Bike
                </a>
                <div className="panel panel-default ">
                    <div className="panel-heading">

                        Bikes Managers Tables

                    </div>
                    <div className="panel-body">
                        <div className="table-responsive">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="dataTables_length" id="dataTables-example_length">
                                        <label>
                                            <select onChange={handleNumberInPage} name="records" aria-controls="dataTables-example" className="form-control input-sm">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option><option value="100">100</option>
                                            </select>
                                            <span>records per page</span>
                                        </label>

                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <form onSubmit={handleSubmit(handleSearch)}>
                                        <div id="dataTables-example_filter" className="dataTables_filter">
                                            <label>
                                                <span>...</span>
                                                <select name="records" aria-controls="dataTables-example" className="form-control input-sm" {...register('searchBy')} >
                                                    <option value="Maker">Maker</option>
                                                    <option value="Name">Name</option>
                                                </select>
                                            </label>
                                            <label style={{ marginLeft: '1em' }}>Search: <input type="search" className="form-control input-sm" aria-controls="dataTables-example" {...register('search')} /></label>

                                        </div>
                                        <div id="dataTables-example_filter" className="dataTables_filter">
                                            <label>
                                                <span>Price: </span>
                                                <select onChange={handlePrice} name="records" aria-controls="dataTables-example" className="form-control input-sm" >
                                                    <option value="default">default</option>
                                                    <option value="1-100">1-100</option>
                                                    <option value="100-500">100-500</option>
                                                    <option value="500-1000">500-1000</option>
                                                    <option value="1000-5000">1000-5000</option>
                                                    <option value="5000-10000">5000-10000</option>
                                                </select>
                                            </label>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <table className="table table-striped table-bordered table-hover" id="dataTables-example">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>image</th>
                                        <th>name</th>
                                        <th>maker</th>
                                        <th>description</th>
                                        <th>price</th>
                                        <th>Quantity</th>
                                        <th>Category</th>
                                        <th>Delete</th>
                                        <th>Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bikes.map((bike) => (
                                        <tr className="gradeU" key={bike.id}>
                                            <td>{bike.id}</td>
                                            <td><img width="50px" height="50px" src={bike.imageUrl} className="img-fluid" alt="This a pic" /></td>
                                            <td>{bike.name}</td>
                                            <td>{bike.maker}</td>
                                            <td>{bike.description}</td>
                                            <td>{bike.price}</td>
                                            <td>{bike.quantity}</td>
                                            <td>{bike.category}</td>
                                            <td><button onClick={() => handleDelete(bike.id)} className="btn btn-danger"><i className="fa fa-pencil"></i> Delete</button></td>
                                            <td><a href={`/admin/bikes/update?id=${bike.id}`} className="btn btn-primary"><i className="fa fa-edit "></i> Edit</a>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="dataTables_info" id="dataTables-example_info" role="alert" aria-live="polite" aria-relevant="all"></div>
                                </div>
                                <div className="col-sm-6">

                                    <div className="dataTables_paginate paging_simple_numbers" id="dataTables-example_paginate">
                                        <ul className="pagination">
                                            <PaginationCompnent filter={filter} pagination={pagination} setFilter={setFilter} />
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*End Advanced Tables */}
            </div>




        </div>
    );
}

export default MainTable;