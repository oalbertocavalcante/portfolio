declare module 'gifenc' {
  type Color = number[];
  type PixelFormat = 'rgb565' | 'rgb444' | 'rgba4444';

  interface FrameOptions {
    palette?: Color[];
    delay?: number;
    repeat?: number;
    transparent?: boolean;
    transparentIndex?: number;
    dispose?: number;
  }

  interface Encoder {
    writeFrame(index: Uint8Array, width: number, height: number, options?: FrameOptions): void;
    finish(): void;
    bytes(): Uint8Array;
  }

  interface Gifenc {
    GIFEncoder(): Encoder;
    quantize(rgba: Uint8Array, maxColors: number, options?: { format?: PixelFormat }): Color[];
    applyPalette(rgba: Uint8Array, palette: Color[], format?: PixelFormat): Uint8Array;
  }

  const gifenc: Gifenc;
  export default gifenc;
}
