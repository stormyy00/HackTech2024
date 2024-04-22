import subprocess

def convert_audio(input_file, output_file, sample_rate=44100, bit_depth=16):
    """
    Converts an audio file to MP3 format using ffmpeg.
    
    :param input_file: str, the path to the input file.
    :param output_file: str, the path where the output MP3 file will be saved.
    """
    # Command to convert audio to MP3
    command = [
        'ffmpeg',
        '-i', input_file,  # Input file
        '-acodec', 'pcm_s16le',  # Audio codec to use for WAV (Linear PCM)
        '-ar', str(sample_rate),  # Audio sample rate
        '-ac', '2',  # Number of audio channels (stereo)
        output_file  # Output file
    ]
    
    try:
        # Execute the ffmpeg command
        subprocess.run(command, check=True)
        print("Conversion successful. Output saved to:", output_file)
    except subprocess.CalledProcessError as e:
        print("An error occurred while converting the audio:", e)

# Example usage
# if __name__ == '__main__':
#     input_path = 'input.wav'  # Replace with your source file path
#     output_path = 'output.mp3'  # Replace with your desired output file path
#     convert_audio(input_path, output_path)
