<?php
/**
 * Plugin Name: Ticketmaster Views
 *
 * @package ticketmaster-views
 */

defined( 'ABSPATH' ) || exit;

function ticketmaster_assets() {
    wp_enqueue_style(
        'ticketmaster',
        'http://localhost:3001/public/main.css',
        ['wp-edit-blocks']
    );
}  

add_action( 'enqueue_block_assets', 'ticketmaster_assets' );

function render_nova_directive($name) {
    return function ($data) use ($name){

        if (empty($name)) {
            throw new \InvalidArgumentException("The component name can not be empty");
        }

        $uuid = wp_generate_uuid4();
    
        $attributes = 'data-hypernova-key="'.$name.'" data-hypernova-id="'.$uuid.'"';
        return (
            '<div '.$attributes.'>Nova Directive</div>'.
            '<script type="application/json" '.$attributes.'><!--'.json_encode($data).'--></script>'
        );
    };
}

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 */
function ticketmaster_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	wp_register_script(
		'ticketmaster',
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components'),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

    register_block_type('ticketmaster/event-listing', [
        'editor_script' => 'ticketmaster',
        'attributes' => [
            'term' => [
                'type' => 'string',
                'default' => 'Concert'
            ],
            'size' => [
                'type' => 'number',
                'default' => 8
            ],
        ],
        'render_callback' => render_nova_directive('EventListing'),
    ]);
}

add_action( 'init', 'ticketmaster_register_block' );