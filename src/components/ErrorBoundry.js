import React from 'react';

/**
 * Error boundry component to ensure the entire UI doesn't break because of a problem with a component
 */
class ErrorBoundry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        }

    }
    /**
     * Catch any errors for information logging
     */
    componentDidCatch(/*error, info*/) {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="alert alert-danger" role="alert">
                    <strong>Something went wrong.</strong>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundry;