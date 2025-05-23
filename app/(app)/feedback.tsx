import { toast } from "@/components/common/toast";
import { InputField } from "@/components/form-fields/input-field";
import { SubmitButton } from "@/components/form-fields/submit-button";
import { Text } from "@/components/ui/text";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { z } from "zod";

const feedbackSchema = z.object({
  comments: z.string().min(1, "Comment are required")
});

export default function FeedbackScreen() {
  const { i18n } = useLingui();
  const router = useRouter();

  const feedbackForm = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      comments: ""
    }
  });

  async function handleSubmit(data: z.infer<typeof feedbackSchema>) {
    toast.success(t(i18n)`Thank you for your feedback!`);
    router.back();
  }

  return (
    <FormProvider {...feedbackForm}>
      <ScrollView
        className="bg-background"
        contentContainerClassName="px-6 py-3"
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <InputField
          name="comments"
          label={`Your message`}
          placeholder={`Report a bug, request a feature, or just say hi!`}
          autoFocus
          disabled={feedbackForm.formState.isLoading}
          multiline
          className="h-[120px]"
        />
        <SubmitButton
          onPress={feedbackForm.handleSubmit(handleSubmit)}
          disabled={feedbackForm.formState.isLoading}
          className="mt-4"
        >
          <Text>{t(i18n)`Send feedback`}</Text>
        </SubmitButton>
      </ScrollView>
    </FormProvider>
  );
}
