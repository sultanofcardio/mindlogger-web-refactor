import React from 'react';

import Avatar from '@mui/material/Avatar';

import {
  useCorrelatedPageMaxHeightLineCount,
  useXScaledDimension,
  useYScaledDimension,
} from './hooks';
import { ActivitiesPhrasalData } from './phrasalData';
import { ResponseSegment } from './ResponseSegment';
import { TextSegment } from './TextSegment';

import { PhrasalTemplatePhrase, PhrasalTemplateField } from '~/entities/activity';
import { Theme } from '~/shared/constants';
import Box from '~/shared/ui/Box';

export type PhraseProps = {
  phrase: PhrasalTemplatePhrase;
  phrasalData: ActivitiesPhrasalData;
  noImage: boolean;
};

export const Phrase = ({ phrase, phrasalData, noImage }: PhraseProps) => {
  const gap = useXScaledDimension(24);
  const minHeight = useXScaledDimension(72);
  const imageWidth = useXScaledDimension(67);
  const imageHeight = useXScaledDimension(66);
  const imagePadding = useXScaledDimension(2);
  const fontSize = useXScaledDimension(16);
  const lineHeight = useYScaledDimension(24);
  const correlatedPageMaxHeightLineCount = useCorrelatedPageMaxHeightLineCount();
  const maxLineCount = correlatedPageMaxHeightLineCount.lineCount;

  const { components } = phrase.fields.reduce(
    (acc, field, fieldIndex) => {
      const isLineStart = fieldIndex === 0 || acc.prevField?.type === 'line_break';

      if (field.type === 'sentence') {
        acc.components.push(<TextSegment text={field.text} isAtStart={isLineStart} />);
      } else if (field.type === 'item_response') {
        acc.components.push(
          <ResponseSegment phrasalData={phrasalData} field={field} isAtStart={isLineStart} />,
        );
      } else if (field.type === 'line_break') {
        acc.components.push(<br />);
      }

      acc.prevField = field;
      return acc;
    },
    { components: [], prevField: undefined } as {
      components: React.ReactNode[];
      prevField?: PhrasalTemplateField;
    },
  );

  return (
    <Box display="flex" gap={`${gap}px`} minHeight={minHeight}>
      {!noImage && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            minWidth: imageWidth,
            height: imageHeight,
          }}
        >
          {phrase.image && (
            <Avatar
              src={phrase.image}
              variant="square"
              sx={{
                width: imageWidth,
                height: imageHeight,
                borderRadius: '8px',
                border: `1px solid ${Theme.colors.light.inverseOnSurface}`,
                padding: `${imagePadding}px`,
              }}
            />
          )}
        </Box>
      )}
      <Box
        fontSize={`${fontSize}px`}
        lineHeight={`${lineHeight}px`}
        display="-webkit-inline-box"
        maxHeight="100%"
        overflow="hidden"
        sx={{
          lineClamp: `${maxLineCount}`,
          '-webkit-line-clamp': `${maxLineCount}`,
          boxOrient: 'vertical',
          '-webkit-box-orient': 'vertical',
        }}
      >
        {React.Children.toArray(components)}
      </Box>
    </Box>
  );
};
