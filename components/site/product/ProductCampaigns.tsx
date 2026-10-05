import { Eyebrow, Lead, Section } from "../primitives";

/* Campaigns / win-back / review texts are outside the initial MVP.
   This file is unmounted on purpose so dormant launch content cannot
   advertise those capabilities. */

export function ProductCampaigns() {
  return (
    <Section>
      <Eyebrow>Not in the initial MVP</Eyebrow>
      <h2 className="max-w-[22ch]">Bulk campaigns are outside this release.</h2>
      <Lead>
        Win-back sequences, review-request texts and bulk messaging to old customers are not part
        of the initial MVP. Planned follow-ups are confirmations, reminders and check-ins for the
        individual customer already in the booking workflow.
      </Lead>
    </Section>
  );
}
