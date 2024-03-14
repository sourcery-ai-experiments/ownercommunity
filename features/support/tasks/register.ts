import { Actor, Interaction, Task } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../domain/abilities/interactWithTheDomain';

export const Register = ({
    asUser: () => Task.where(`#actor registers as user`,
      Interaction.where(`#actor creates user`, async (actor:Actor) => {
          InteractWithTheDomain.asActor(actor).registerAsUser(actor);
      })
    ),
});
