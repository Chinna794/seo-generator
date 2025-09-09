import GenerateMetadataButton from "./generate-metadata-button";
import GenerateTagsModal from "./generate-tags-modal";

export default function GenerateTags() {
  return (
    <GenerateTagsModal>
      <GenerateMetadataButton />
    </GenerateTagsModal>
  );
}
