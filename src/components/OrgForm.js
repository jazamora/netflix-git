import React from 'react';

/**
 * Search form component for user inputed org searches
 */
class OrgForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            org: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Handle the input form change
     * 
     * @param {object} e 
     */
    handleInputChange(e) {
        this.setState({
            org: e.target.value
        });
    }

    /**
     * Handle when the form is submited
     * 
     * @param {object} e 
     */
    handleSubmit(e) {
        e.preventDefault();

        this.props.onChange(this.state.org);
    }

    render() {
        return (
            <form id="search-form" onSubmit={this.handleSubmit}>
                <div className="input-group input-group-lg">
                    <span className="input-group-btn">
                        <button className="btn btn-search" type="button">
                            <i className="fas fa-search" aria-hidden="true"></i>
                        </button>
                    </span>
                    <input type="text"
                        value={this.state.org}
                        onChange={this.handleInputChange}
                        className="form-control user-search"
                        placeholder="Enter Git Org to display repositories"
                        autoComplete="off"
                    />
                </div>
            </form>
        );
    }
}

export default OrgForm;