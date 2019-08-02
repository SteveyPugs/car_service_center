import React from 'react';
import { Link } from "react-router-dom";

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
                                    <input type="email" className="form-control form-control-sm" id="UserEmail" placeholder="john.doe@example.com" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control form-control-sm" id="UserPassword" />
                                </div>
                                <button type="submit" className="btn btn-primary btn-sm btn-block" onClick={props.loginUser}>Sign In</button>
                                <hr />
                                <Link to="/forgot" className="btn btn-info btn-sm btn-block">
                                    Forgot Password
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    );
}

export default SignIn;
