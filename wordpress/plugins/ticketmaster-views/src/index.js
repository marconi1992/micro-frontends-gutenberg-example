import NovaPreview from './components/NovaPreview'

const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { TextControl, ServerSideRender } = wp.components;

registerBlockType( 'ticketmaster/event-listing', {
	title: 'Event Listing',
	icon: 'tickets-alt',
	category: 'layout',
	edit: ( props ) => {
        const { attributes } = props;
        const { term, size } = attributes;
        
        const onTermChange = (term) => {
            props.setAttributes({
                term,
            });
        }

        const onSizeChange = (size) => {
            props.setAttributes({
                size,
            });
        }

		return [
            <InspectorControls>
                <TextControl
                    label="Term"
                    value={ term }
                    onChange={ onTermChange }
                />

                <TextControl
                    label="Size"
                    value={ size }
                    onChange={ onSizeChange }
                />
            </InspectorControls>,
            <NovaPreview name="EventListing" attributes={attributes}/>
        ]
	},
	save: () => {
        return null
	},
} );