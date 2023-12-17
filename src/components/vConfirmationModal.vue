<template>
	<teleport to="body">
		<div class="overflow">
			<div class="modal">
				<div class="modal-text">{{ confirmationText }}</div>
				<div class="modal-buttons">
					<div
						class="modal-buttons__button"
						@click="emit('confirm')"
					>
						{{ confirmButtonTitle }}
					</div>
					<div 
						class="modal-buttons__button"
						@click="emit('close')"
					>
						{{ closeButtonTitle }}
					</div>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script setup>
	/* vue */
	import { defineProps, defineEmits } from 'vue';

	/* use */
	import { useLanguage } from '@/use/useLanguage';

	const emit = defineEmits(['close']);

	const props = defineProps({ confirmationText: String });

	const confirmationText = props.confirmationText || useLanguage({
		'UA': 'Ви впевнені?',
		'EN': 'Are you sure?',
	});

	const closeButtonTitle = useLanguage({
		'UA': 'Закрити',
		'EN': 'Close',
	});

	const confirmButtonTitle = useLanguage({
		'UA': 'Підтвердити',
		'EN': 'Confirm',
	});
</script>

<style scoped>
	.overflow {
		z-index: 2;
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background-color: #00000080;
	}

	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		padding: 15px;
		border-radius: 5px;
		width: 500px;
		transform: translate(-50%, -50%);
		background-color: var(--primary-color);
		box-shadow: 0 0 3.33px 1.11px #00000080;
	}

	.modal-text {
		display: flex;
		justify-content: center;
		color: var(--secondary-color);
	}

	.modal-buttons {
		display: flex;
		justify-content: space-between;
	}

	.modal-buttons__button {
		padding: 5px 15px;
		color: var(--primary-color);
		font-weight: 700;
		border-radius: 5px;
		cursor: pointer;
		background-color: #35495e90;
	}

	.modal-buttons__button:hover {
		background-color: #35495e;
	}
</style>