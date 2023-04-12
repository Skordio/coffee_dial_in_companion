def strip_file_blank_space(filename):
    # Strips null bytes at the end of a file, and returns the new file size
    # This will process the file all at once
    # Open the file for reading bytes (then close)
    with open(filename, "rb") as f:
        # Read all of the data into memory
        data = f.read()
    # Strip trailing null bytes from the data in-memory
    data = data.rstrip(b'\x00')
    # Open the file for writing bytes (then close)
    with open(filename, "wb") as f:
        # Write the data from memory to the disk
        f.write(data)
    # Return the new file size
    return(len(data))

new_size = strip_file_blank_space("models.py")