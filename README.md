
This package uses `stream-mmmagic` to sniff for magic-bytes on a stream without interupting the
stream. In fact, this package uses `stream-mmmagic` directly with a single change:

It ships with a custom `magic`-file that contains patterns for mime-types that are not detected
by the current default `magic`-file.

## Usage

As in [`stream-mmmagic`](https://www.npmjs.com/package/stream-mmmagic).

Custom magic-files are not supported. This would not make sense. The only meaning if this package
is to provide a custom magic-file.

## Additional file-type

* `video/m2pt`: MPEG2-Transport-Stream (used by cameras that record AVHCD-videos)


