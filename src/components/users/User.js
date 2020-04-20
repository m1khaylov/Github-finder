import React, { Fragment, useEffect, useContext } from "react";
import { Spinner } from "../layout/Spinner";
import { Repos } from "../repos/Repos";
import { Link } from "react-router-dom";
import GithubContext from "../../context/github/githubContext";

const User = () => {
    const githubContext = useContext(GithubContext);

    useEffect(() => {
        githubContext.getUser(githubContext.match.params.login);
        githubContext.getUserRepos(githubContext.match.params.login);
        // eslint-disable-next-line
    }, []);

    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        company,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
    } = githubContext.user;

    if (githubContext.loading) return <Spinner />;

    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>
                Back to Search
            </Link>
            Hireable:{" "}
            {hireable ? (
                <i className='fas fa-check text-success' />
            ) : (
                <i className='fas fa-times-circle text-danger' />
            )}
            <div className='card grid-2'>
                <div className='all-center'>
                    <img
                        src={avatar_url}
                        alt='avatar'
                        className='round-img center'
                        style={{ width: "150px" }}
                    />
                    <h1>{name}</h1>
                    <p>
                        {" "}
                        <i className='fas fa-map-marker-alt' /> {location}
                    </p>
                </div>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className='btn btn-dark my-1'>
                        Visit Github profile
                    </a>
                    <ul>
                        <li>
                            {login && (
                                <Fragment>
                                    {" "}
                                    <i className='fas fa-user' />
                                    <strong> {login}</strong>
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {company && (
                                <Fragment>
                                    {" "}
                                    <i className='fas fa-building' />
                                    <strong> {company}</strong>
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {blog && (
                                <Fragment>
                                    {" "}
                                    <i className='fas fa-desktop' />
                                    <strong> {blog}</strong>
                                </Fragment>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className='card text-center'>
                <div className='badge badge-primary'>
                    Followers: {followers}
                </div>
                <div className='badge badge-success'>
                    Following: {following}
                </div>
                <div className='badge badge-light'>
                    Public Repos: {public_repos}
                </div>
                <div className='badge badge-dark'>
                    Public Gists: {public_gists}
                </div>
            </div>
            <Repos repos={githubContext.repos} />
        </Fragment>
    );
};

export default User;
