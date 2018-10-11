import React from 'react';
import Gravatar from 'react-gravatar';
import TimeAgo from 'react-timeago';

/**
 * Commit component that shows the details for a specific commit
 * 
 * @param {object} props 
 */
const Commit = (props) => {
    const shaPrefix = props.sha.substring(1, 7);
    const imageSize = 20;

    return (   
        <div className="commit">
            <h5><a 
                    href={props.html_url} 
                    target="_blank" 
                    title="View commit details" 
                    rel="noopener noreferrer">{props.message}
                </a>
            </h5>
            <div className="text-muted">

                <a href={props.login_url} className="img-link" target="_blank" rel="noopener noreferrer">
                    {props.avatar_url ? (
                        <img className="img" src={props.avatar_url} alt={props.login_url}/>
                    ) : (
                        <Gravatar className="img" email={props.email} size={imageSize} />
                    )}
                    {props.login}
                </a> commited <TimeAgo date={props.date} />

                <div className="pull-right">
                    <div className="btn-group btn-group-sm" role="group">
                        <a 
                            className="btn btn-default" 
                            href={props.html_url} 
                            role="button" 
                            title="View commit details" 
                            target="_blank" 
                            rel="noopener noreferrer">{shaPrefix}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * Default props 
 */
Commit.defaultProps = {
    sha: '12345678'
}

export default Commit;
