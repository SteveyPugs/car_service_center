import React from 'react';

var SignIn = (props) => {
    return(
        <div>
            <br/>
            <br/>
            <br/>
            <div className="row">
                <div className="col-4 offset-4">
                    <div className="card">
                        <div className="card-header text-center">Car Service Login</div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" id="UserEmail" placeholder="john.doe@example.com" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" id="UserPassword" />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    );
}

export default SignIn;
