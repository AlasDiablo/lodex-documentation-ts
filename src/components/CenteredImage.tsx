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
            <img src={src} alt={alt} />
        </div>
    );
};

export default CenteredImage;
