import type { FilmstripFrame } from './useFilmstrip';
import {
  FilmstripCell,
  FilmstripImage,
  FilmstripPlaceholder,
  FilmstripRow,
} from './VideoScrubber.styles';

export type FilmstripProps = {
  frames: FilmstripFrame[];
  frameCount: number;
};

export function Filmstrip({ frames, frameCount }: FilmstripProps) {
  return (
    <FilmstripRow>
      {Array.from({ length: frameCount }).map((_, index) => {
        const frame = frames[index];
        return (
          <FilmstripCell key={index}>
            {frame ? (
              <FilmstripImage
                source={{ uri: frame.uri }}
                contentFit="cover"
                cachePolicy="memory-disk"
              />
            ) : (
              <FilmstripPlaceholder />
            )}
          </FilmstripCell>
        );
      })}
    </FilmstripRow>
  );
}
