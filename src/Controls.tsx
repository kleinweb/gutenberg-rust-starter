import { PanelBody, BaseControl, Button } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { InspectorControls } from '@wordpress/block-editor'
import { useEffect } from '@wordpress/element'
import { useServer } from './hooks/useServer'
import './styles/editor.scss'
import type { Attributes } from '.'

interface ControlProps {
    attributes: Attributes
    setAttributes: (attributes: Attributes) => void
}

export const Controls = ({ attributes, setAttributes }: ControlProps) => {
    const server = useServer()
    const setQuote = () => {
        if (server?.hasOwnProperty('get_text')) {
            setAttributes({ text: server.get_text() })
        }
    }

    useEffect(() => {
        if (attributes.text === 'Loading...') {
            setQuote()
        }
    }, [server])

    return (
        <InspectorControls>
            <PanelBody title={__('Settings', 'rust-starter')}>
                <BaseControl id="get-text">
                    <Button isPrimary onClick={setQuote}>
                        {__('Get new text', 'rust-starter')}
                    </Button>
                </BaseControl>
            </PanelBody>
        </InspectorControls>
    )
}
