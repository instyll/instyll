import { commandsCtx } from '@milkdown/core'
import { $command, $markAttr, $markSchema, $useKeymap } from '@milkdown/utils'
import { toggleMarkdownMark } from '@milkdown/prose'
import { linkSchema } from '@milkdown/preset-commonmark';

export const stopLinkCommand = $command('stopLink', (ctx) => () => {
    return (state, dispatch) => {
        if (!dispatch) {
            return false;
        }
      const markType = linkSchema.type(ctx);
      dispatch(state.tr.removeStoredMark(markType))
      return false;
    }
});

export const linkCustomKeymap = $useKeymap('linkCustomKeymap', {
    StopLink: {
      shortcuts: ['Space'],
      command: (ctx) => {
        const commands = ctx.get(commandsCtx)
        return () => commands.call(stopLinkCommand.key)
      },
    },
  })

