import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loading } from './Loading';

const meta: Meta<typeof Loading> = {
  title: 'UI/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {};

export const CustomClass: Story = {
  args: {
    className: 'min-h-[300px]',
  },
};

export const InCard: Story = {
  render: () => (
    <div className="bg-surface border border-border rounded-md p-4 max-w-sm">
      <Loading />
    </div>
  ),
};
