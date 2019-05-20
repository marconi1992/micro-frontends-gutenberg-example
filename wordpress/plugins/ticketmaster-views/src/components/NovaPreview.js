import NovaClient from '../NovaClient';
import debounce from 'lodash.debounce';

const { Component } = wp.element

class NovaPreview extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            html: ''
        }
    
        const nova = new NovaClient();

        this.fetch = async () => {
            const { name, attributes } = this.props
            const uuid = nova.addJob(name, attributes);

            const { results } = await nova.batch();

            const { html } = results[uuid] || {}

            this.setState({ html });
        };

        this.debouncedFetch = debounce(this.fetch, 600)
    }

    componentWillMount() {
        return this.fetch();
    }

    componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.debouncedFetch();
		}
	}

    render() {
        const { html } = this.state;
        
        return (
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
        )
    }
}

export default NovaPreview