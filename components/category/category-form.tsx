import {
  CATEGORY_EXPENSE_ICONS,
  CATEGORY_INCOME_ICONS
} from "@/lib/icons/category-icons";
import { useEffect, useRef } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import { View } from "react-native";
import { InputField } from "../form-fields/input-field";
import { SubmitButton } from "../form-fields/submit-button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Text } from "../ui/text";
import { SelectCategoryIconField } from "./select-category-icon-field";

type CategoryFormProps = {
  onSubmit: (data: any) => void;
  defaultValues?: Partial<any>;
  hiddenFields?: "type"[];
};

export const CategoryForm = ({
  onSubmit,
  defaultValues,
  hiddenFields = []
}: CategoryFormProps) => {
  const nameInputRef = useRef<TextInput>(null);

  const categoryForm = useForm<any>({
    defaultValues: {
      name: "",
      icon:
        defaultValues?.type === "INCOME"
          ? CATEGORY_INCOME_ICONS[0]
          : CATEGORY_EXPENSE_ICONS[0],
      ...defaultValues,
      type: defaultValues?.type || "EXPENSE"
    }
  });
  const type = categoryForm.watch("type");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (defaultValues?.icon) {
      return;
    }
    categoryForm.setValue(
      "icon",
      type === "INCOME" ? CATEGORY_INCOME_ICONS[0] : CATEGORY_EXPENSE_ICONS[0]
    );
  }, [type, defaultValues?.icon, categoryForm]);

  const isTypeHidden = hiddenFields.includes("type");

  return (
    <FormProvider {...categoryForm}>
      <View className="flex flex-1 gap-4">
        <InputField
          ref={nameInputRef}
          name="name"
          label={`Name`}
          placeholder={`Category name`}
          autoCapitalize="none"
          autoFocus={!defaultValues}
          className="!pl-[62px]"
          disabled={categoryForm.formState.isLoading}
          leftSection={
            <SelectCategoryIconField
              type={type}
              disabled={categoryForm.formState.isLoading}
              onSelect={() => nameInputRef.current?.focus()}
            />
          }
        />

        {!isTypeHidden && (
          <>
            <Text className="font-medium">{`Type`}</Text>
            <Controller
              control={categoryForm.control}
              name="type"
              render={({ field }) => (
                <Tabs
                  value={field.value}
                  className="-mt-3"
                  onValueChange={field.onChange}
                >
                  <TabsList>
                    <TabsTrigger
                      disabled={categoryForm.formState.isLoading}
                      value="EXPENSE"
                    >
                      <Text>{`Expense`}</Text>
                    </TabsTrigger>
                    <TabsTrigger
                      disabled={categoryForm.formState.isLoading}
                      value="INCOME"
                    >
                      <Text>{`Income`}</Text>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              )}
            />
          </>
        )}

        <SubmitButton
          onPress={categoryForm.handleSubmit(onSubmit)}
          disabled={categoryForm.formState.isLoading}
          className="mt-4"
        >
          <Text>{`Save`}</Text>
        </SubmitButton>
      </View>
    </FormProvider>
  );
};
