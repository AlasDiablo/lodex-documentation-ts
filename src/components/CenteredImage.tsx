import type { PropsWithoutRef } from 'react';

export type CenteredImageProps = PropsWithoutRef<{
    src: any;
    alt: string;
}>;

const CenteredImage = ({ src, alt }: CenteredImageProps) => {
    return (
        <div
            style={{
                height: 'fit-content',
                width: 'fit-content',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
        >
            <div
                style={{
                    padding: '5px',
                    paddingBottom: '0',
                    margin: '5px',
                    borderRadius: '5px',
                    border: '1px solid var(--ifm-toc-border-color)',
                }}
            >
                <img
                    style={{
                        borderRadius: '5px',
                    }}
                    src={src}
                    alt={alt}
                />
            </div>
        </div>
    );
};

export default CenteredImage;
