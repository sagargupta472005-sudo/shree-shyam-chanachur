import zlib, struct

def read_png(filename):
    with open(filename, 'rb') as f:
        sig = f.read(8)
        assert sig == b'\x89PNG\r\n\x1a\n'
        chunks = []
        while True:
            length_bytes = f.read(4)
            if not length_bytes:
                break
            length = struct.unpack('>I', length_bytes)[0]
            chunk_type = f.read(4)
            chunk_data = f.read(length)
            crc = f.read(4)
            chunks.append((chunk_type, chunk_data))
            if chunk_type == b'IEND':
                break
    
    ihdr = [c[1] for c in chunks if c[0] == b'IHDR'][0]
    w, h, bit_depth, color_type, comp, filt, interlace = struct.unpack('>IIBBBBB', ihdr[:13])
    print(f"Dimensions: {w}x{h}, bit_depth={bit_depth}, color_type={color_type}, interlace={interlace}")
    
    idat_data = b''.join([c[1] for c in chunks if c[0] == b'IDAT'])
    raw_data = zlib.decompress(idat_data)
    print(f"Decompressed raw data size: {len(raw_data)} bytes")

read_png('home page.png')
