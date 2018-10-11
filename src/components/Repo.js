import React from 'react';
import TimeAgo from 'react-timeago';

/**
 * Repo component that will display repo details
 */
class Repo extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Handle the click event to show a repo
     * 
     * @param {object} e 
     */
    handleClick(e) {
        this.props.handleRepoClick(this.props.full_name)
    }

    render() {
        const starCount = this.props.stargazers_count.toLocaleString();
        const forkCount = this.props.forks_count.toLocaleString();

        return (
            <div className="repo">
                <h2>
                    <button className='btn-link' onClick={this.handleClick} title="View commit history">{this.props.full_name}</button>
                </h2>
                <p className="text-muted">{this.props.description}</p>

                <div className="details text-muted">
                    <span>{this.props.language}</span>
                    <a href={`https://github.com/${this.props.full_name}/stargazers`} target="_blank" title="View Star Gazers" rel="noopener noreferrer"><i className="far fa-star"></i><span>{starCount}</span></a>
                    <a href={`https://github.com/${this.props.full_name}/network`} target="_blank" title="View Repo Network" rel="noopener noreferrer"><i className="fas fa-code-branch"></i><span>{forkCount}</span></a>
                    Updated <TimeAgo date={this.props.pushed_at} />
                </div>
            </div>
        );
    }
}

/**
 * Default props given that some values are not always available 
 */
Repo.defaultProps = {
    description: 'no description',
    forks_count: 0,
    language: 'Text',
    stargazers_count: 0
}

export default Repo;
