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
                            <form onSubmit={props.handleLogin} className="needs-validation" noValidate>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="UserEmail" id="UserEmail" className="form-control form-control-sm" placeholder="john.doe@example.com" required />
                                    <div className="invalid-feedback">Enter valid email</div>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="UserPassword" id="UserPassword" className="form-control form-control-sm" required />
                                    <div className="invalid-feedback">Enter password</div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-sm btn-block">Sign In</button>
                            </form>
                            <hr />
                            <Link to="/forgot" className="btn btn-info btn-sm btn-block">
                                Forgot Password
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    );
}

export default SignIn;
