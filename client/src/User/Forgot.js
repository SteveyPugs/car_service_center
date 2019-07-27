import React from 'react';

var Forgot = (props) => {
    return(
        <div>
            <br/>
            <br/>
            <br/>
            <div className="row">
                <div className="col-4 offset-4">
                    <div className="card">
                        <div className="card-header text-center">Forgot Password</div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" id="UserEmail" placeholder="john.doe@example.com" />
                                </div>
                                <button type="submit" className="btn btn-primary btn-sm btn-block">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    );
}

export default Forgot;